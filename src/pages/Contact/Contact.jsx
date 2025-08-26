import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import Swal from "sweetalert2";
import {
    useDeleteContactMutation,
    useGetAllContactQuery,
} from "../../redux/api/contactApi";
import PageHeading from "../../Components/Shared/PageHeading";
import { IoSearch } from "react-icons/io5";

export default function Contact() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    // Debounce searchTerm
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setPage(1); // Reset to first page on search
        }, 600);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const { data, isLoading, refetch } = useGetAllContactQuery({ searchTerm: debouncedSearchTerm, page, limit });
    const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await deleteContact(id).unwrap();
                message.success("Contact deleted successfully");
                refetch();
            } catch (error) {
                message.error("Failed to delete contact", error);
            }
        }
    };

    const handleSearch = () => {
        setDebouncedSearchTerm(searchTerm);
        setPage(1);
    };

    const handleTableChange = (pagination) => {
        setPage(pagination.current);
        setLimit(pagination.pageSize);
    };

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Question", dataIndex: "question", key: "question" },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Button
                    danger
                    loading={isDeleting}
                    onClick={() => handleDelete(record._id)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    const meta = data?.data?.meta || {};

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <PageHeading title="Contact List" />
                <div className="relative w-full sm:w-[300px]">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch();
                        }}
                        className="border-2 border-[#00823b] py-3 pl-12 pr-[65px] outline-none w-full rounded-md"
                    />
                    <span
                        className="text-gray-400 absolute top-0 left-0 h-full px-5 flex items-center justify-center cursor-pointer"
                        onClick={handleSearch}
                    >
                        <IoSearch className="text-[1.3rem]" />
                    </span>
                </div>
            </div>

            <Table
                loading={isLoading}
                dataSource={data?.data?.allContactList || []}
                columns={columns}
                rowKey="_id"
                pagination={{
                    current: meta.page || 1,
                    pageSize: meta.limit || 10,
                    total: meta.total || 0,
                }}
                onChange={handleTableChange}
                style={{
                    fontSize: 16,
                }}
                components={{
                    header: {
                        cell: (props) => (
                            <th
                                {...props}
                                style={{
                                    background: "#00823b",
                                    color: "rgb(255,255,255)",
                                    fontSize: 16,
                                    ...props.style,
                                }}
                            >
                                {props.children}
                            </th>
                        ),
                    },
                }}
            />
        </div>
    );
}
