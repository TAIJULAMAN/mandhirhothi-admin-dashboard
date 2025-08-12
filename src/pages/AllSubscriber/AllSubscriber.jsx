import React, { useState } from "react";
import { ConfigProvider, Modal, Table } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

import img from "../../assets/block.png";
import PageHeading from "../../Components/Shared/PageHeading";
import { IoSearch } from "react-icons/io5";


const AllUsers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [page, setPage] = useState(1);

    // Demo users data
    const demoUsers = [
        {
            key: "1",
            no: 1,
            User: "John Doe",
            img: "https://randomuser.me/api/portraits/men/1.jpg",
            date: "2025-05-20",
            phone: "+1 (555) 123-4567",
            Status: "Active",
            Plans: "Free",
            email: "john.doe@example.com",
        },
        {
            key: "2",
            no: 2,
            User: "Jane Smith",
            img: "https://randomuser.me/api/portraits/women/2.jpg",
            date: "2025-04-18",
            phone: "+44 7700 900123",
            Status: "Active",
            Plans: "Premium",
            email: "jane.smith@example.co.uk",
        },
        {
            key: "3",
            no: 3,
            User: "Ahmed Khan",
            img: "https://randomuser.me/api/portraits/men/3.jpg",
            date: "2025-03-15",
            phone: "+92 300 1234567",
            Status: "Blocked",
            Plans: "Free",
            email: "ahmed.khan@example.pk",
        },
        {
            key: "4",
            no: 4,
            User: "Maria Garcia",
            img: "https://randomuser.me/api/portraits/women/4.jpg",
            date: "2025-06-05",
            phone: "+34 600 123 456",
            Status: "Active",
            Plans: "Standard",
            email: "maria.garcia@example.es",
        },
        {
            key: "5",
            no: 5,
            User: "David Lee",
            img: "https://randomuser.me/api/portraits/men/5.jpg",
            date: "2025-02-28",
            phone: "+1 (213) 555-7890",
            Status: "Active",
            Plans: "Premium",
            email: "david.lee@example.com",
        },
        {
            key: "6",
            no: 6,
            User: "Sophia Brown",
            img: "https://randomuser.me/api/portraits/women/6.jpg",
            date: "2025-01-12",
            phone: "+1 (617) 555-3322",
            Status: "Active",
            Plans: "Free",
            email: "sophia.brown@example.com",
        },
        {
            key: "7",
            no: 7,
            User: "Carlos Martinez",
            img: "https://randomuser.me/api/portraits/men/7.jpg",
            date: "2025-04-10",
            phone: "+52 55 1234 5678",
            Status: "Blocked",
            Plans: "Standard",
            email: "carlos.martinez@example.mx",
        },
        {
            key: "8",
            no: 8,
            User: "Olivia Wilson",
            img: "https://randomuser.me/api/portraits/women/8.jpg",
            date: "2025-06-15",
            phone: "+44 7800 123456",
            Status: "Active",
            Plans: "Premium",
            email: "olivia.wilson@example.co.uk",
        },
        {
            key: "9",
            no: 9,
            User: "Hiroshi Tanaka",
            img: "https://randomuser.me/api/portraits/men/9.jpg",
            date: "2025-05-02",
            phone: "+81 90-1234-5678",
            Status: "Active",
            Plans: "Free",
            email: "hiroshi.tanaka@example.jp",
        },
        {
            key: "10",
            no: 10,
            User: "Emma Johnson",
            img: "https://randomuser.me/api/portraits/women/10.jpg",
            date: "2025-04-29",
            phone: "+1 (305) 555-7788",
            Status: "Blocked",
            Plans: "Standard",
            email: "emma.johnson@example.com",
        },
        {
            key: "11",
            no: 11,
            User: "Liam Anderson",
            img: "https://randomuser.me/api/portraits/men/11.jpg",
            date: "2025-03-22",
            phone: "+61 400 123 456",
            Status: "Active",
            Plans: "Premium",
            email: "liam.anderson@example.au",
        },
        {
            key: "12",
            no: 12,
            User: "Chloe Martin",
            img: "https://randomuser.me/api/portraits/women/12.jpg",
            date: "2025-06-01",
            phone: "+33 6 12 34 56 78",
            Status: "Active",
            Plans: "Standard",
            email: "chloe.martin@example.fr",
        },
        {
            key: "13",
            no: 13,
            User: "Noah Kim",
            img: "https://randomuser.me/api/portraits/men/13.jpg",
            date: "2025-05-12",
            phone: "+82 10-1234-5678",
            Status: "Blocked",
            Plans: "Free",
            email: "noah.kim@example.kr",
        },
        {
            key: "14",
            no: 14,
            User: "Ava Taylor",
            img: "https://randomuser.me/api/portraits/women/14.jpg",
            date: "2025-01-28",
            phone: "+1 (415) 555-7788",
            Status: "Active",
            Plans: "Premium",
            email: "ava.taylor@example.com",
        },
        {
            key: "15",
            no: 15,
            User: "Lucas White",
            img: "https://randomuser.me/api/portraits/men/15.jpg",
            date: "2025-03-08",
            phone: "+27 82 123 4567",
            Status: "Active",
            Plans: "Standard",
            email: "lucas.white@example.za",
        },
        {
            key: "16",
            no: 16,
            User: "Isabella Lopez",
            img: "https://randomuser.me/api/portraits/women/16.jpg",
            date: "2025-02-14",
            phone: "+34 612 345 678",
            Status: "Active",
            Plans: "Free",
            email: "isabella.lopez@example.es",
        },
        {
            key: "17",
            no: 17,
            User: "Ethan Clark",
            img: "https://randomuser.me/api/portraits/men/17.jpg",
            date: "2025-04-21",
            phone: "+1 (202) 555-3344",
            Status: "Blocked",
            Plans: "Premium",
            email: "ethan.clark@example.com",
        },
        {
            key: "18",
            no: 18,
            User: "Mia Gonzalez",
            img: "https://randomuser.me/api/portraits/women/18.jpg",
            date: "2025-06-09",
            phone: "+52 55 5678 1234",
            Status: "Active",
            Plans: "Standard",
            email: "mia.gonzalez@example.mx",
        },
        {
            key: "19",
            no: 19,
            User: "Benjamin Walker",
            img: "https://randomuser.me/api/portraits/men/19.jpg",
            date: "2025-02-19",
            phone: "+1 (646) 555-9911",
            Status: "Active",
            Plans: "Free",
            email: "benjamin.walker@example.com",
        },
        {
            key: "20",
            no: 20,
            User: "Charlotte Hall",
            img: "https://randomuser.me/api/portraits/women/20.jpg",
            date: "2025-03-30",
            phone: "+44 7400 987654",
            Status: "Blocked",
            Plans: "Premium",
            email: "charlotte.hall@example.co.uk",
        },
        {
            key: "21",
            no: 21,
            User: "Henry Allen",
            img: "https://randomuser.me/api/portraits/men/21.jpg",
            date: "2025-05-14",
            phone: "+1 (503) 555-7788",
            Status: "Active",
            Plans: "Standard",
            email: "henry.allen@example.com",
        },
        {
            key: "22",
            no: 22,
            User: "Amelia Young",
            img: "https://randomuser.me/api/portraits/women/22.jpg",
            date: "2025-04-17",
            phone: "+61 411 234 567",
            Status: "Active",
            Plans: "Free",
            email: "amelia.young@example.au",
        },
        {
            key: "23",
            no: 23,
            User: "Jack Scott",
            img: "https://randomuser.me/api/portraits/men/23.jpg",
            date: "2025-06-03",
            phone: "+44 7900 123456",
            Status: "Blocked",
            Plans: "Premium",
            email: "jack.scott@example.co.uk",
        },
        {
            key: "24",
            no: 24,
            User: "Ella King",
            img: "https://randomuser.me/api/portraits/women/24.jpg",
            date: "2025-01-25",
            phone: "+1 (310) 555-6677",
            Status: "Active",
            Plans: "Standard",
            email: "ella.king@example.com",
        },
        {
            key: "25",
            no: 25,
            User: "Sebastian Perez",
            img: "https://randomuser.me/api/portraits/men/25.jpg",
            date: "2025-05-19",
            phone: "+34 645 987 654",
            Status: "Active",
            Plans: "Free",
            email: "sebastian.perez@example.es",
        },
        {
            key: "26",
            no: 26,
            User: "Grace Green",
            img: "https://randomuser.me/api/portraits/women/26.jpg",
            date: "2025-04-01",
            phone: "+1 (720) 555-8899",
            Status: "Active",
            Plans: "Premium",
            email: "grace.green@example.com",
        },
        {
            key: "27",
            no: 27,
            User: "Daniel Baker",
            img: "https://randomuser.me/api/portraits/men/27.jpg",
            date: "2025-02-07",
            phone: "+64 21 123 4567",
            Status: "Blocked",
            Plans: "Standard",
            email: "daniel.baker@example.nz",
        },
        {
            key: "28",
            no: 28,
            User: "Victoria Adams",
            img: "https://randomuser.me/api/portraits/women/28.jpg",
            date: "2025-03-16",
            phone: "+44 7300 123456",
            Status: "Active",
            Plans: "Free",
            email: "victoria.adams@example.co.uk",
        },
        {
            key: "29",
            no: 29,
            User: "Matthew Turner",
            img: "https://randomuser.me/api/portraits/men/29.jpg",
            date: "2025-05-08",
            phone: "+1 (808) 555-5544",
            Status: "Active",
            Plans: "Premium",
            email: "matthew.turner@example.com",
        },
        {
            key: "30",
            no: 30,
            User: "Hannah Carter",
            img: "https://randomuser.me/api/portraits/women/30.jpg",
            date: "2025-04-25",
            phone: "+1 (919) 555-4455",
            Status: "Blocked",
            Plans: "Standard",
            email: "hannah.carter@example.com",
        },
    ];


    const showModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const showModal2 = (user) => {
        setSelectedUser(user);
        setIsModalOpen2(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };

    const handleBlock = async () => {
        if (selectedUser) {
            // In demo mode, just close the modal
            setIsModalOpen(false);
        }
    };

    const columns = [
        {
            title: "No",
            key: "no",
            render: (_, record, index) => {
                return (page - 1) * 10 + index + 1;
            }
        },
        {
            title: "User",
            key: "User",
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <img
                        src="https://avatar.iran.liara.run/public/16"
                        className="w-10 h-10 object-cover rounded-full"
                        alt="User Avatar"
                    />
                    <div className="flex flex-col gap-[2px]">
                        <span className="leading-none">{record?.User}</span>

                    </div>
                </div>
            ),
        },
        {
            title: "Email",
            key: "email",
            dataIndex: "email"
        },
        { title: "Status", dataIndex: "Status", key: "Status" },
        { title: "Plans", dataIndex: "Plans", key: "Plans" },
        { title: "Expiration Date", dataIndex: "date", key: "date" },

    ];

    return (
        <>
            <div className="flex items-center justify-between mb-5">
                <PageHeading title="Users Management" />
                <div className="flex gap-5">
                    <div className="relative w-full sm:w-[300px] ">
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search..."
                            className="border-2 border-[#00823b] py-3 pl-12 pr-[65px] outline-none w-full rounded-md"
                        />
                        <span className=" text-gray-400 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
                            <IoSearch className="text-[1.3rem]" />
                        </span>
                    </div>
                    {/* <div className="text-white "> */}
                    <button
                        onClick={handleBlock}
                        className="bg-[#00823b] !text-white font-semibold w-1/3 py-3 px-5 rounded-lg"
                    >
                        Manages Fees
                    </button>
                    {/* </div> */}
                </div>
            </div>
            <ConfigProvider
                theme={{
                    components: {
                        InputNumber: {
                            activeBorderColor: "#00823b",
                        },
                        Pagination: {
                            colorPrimary: "#00823b",
                            colorPrimaryHover: "#00823b",
                            itemActiveBg: "#00823b",
                            itemActiveColor: "#ffffff",
                            colorBgTextHover: "#00823b",
                            colorText: "#00823b",
                        },
                        Table: {
                            headerBg: "#00823b",
                            headerColor: "rgb(255,255,255)",
                            cellFontSize: 16,
                            headerSplitColor: "#00823b",
                        },
                    },
                }}
            >
                <Table
                    dataSource={demoUsers}
                    columns={columns}
                    scroll={{ x: "max-content" }}
                    pagination={{
                        pageSize: 10,
                        total: demoUsers.length,
                        current: page,
                        showSizeChanger: false,
                        onChange: (page) => setPage(page),
                    }}
                />

                {/* Block Modal */}
                <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null}>
                    <div className="flex flex-col justify-center items-center py-10">
                        <img src={img} alt="Confirmation" className="w-40 h-40 mb-5" />
                        <p className="text-3xl text-center text-gray-800">Warning</p>
                        <p className="text-xl text-center mt-5">
                            Do you want to block this user?
                        </p>
                        <div className="text-center py-5 w-full flex justify-center gap-4">
                            <button
                                onClick={handleCancel}
                                className="border-2 border-[#00823b] text-[#00823b] font-semibold w-1/3 py-3 px-5 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBlock}
                                className="bg-[#00823b] !text-white font-semibold w-1/3 py-3 px-5 rounded-lg"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </Modal>
                {/* View Modal */}
                <Modal
                    open={isModalOpen2}
                    centered
                    onCancel={handleCancel2}
                    footer={null}
                    width={700}
                >
                    <div className="w-full p-5 relative mx-auto m">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-[#00823b] mb-2">User Details</h1>
                            <p className="text-gray-500 text-sm">See all details about John Doe</p>
                        </div>

                        {/* Profile Section */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                                <img src="https://avatar.iran.liara.run/public/15" alt="user profile picture" className="w-full h-full object-cover" />
                            </div>
                            <h2 className="text-xl font-bold text-[#00823b]">John Doe</h2>
                        </div>

                        {/* Details Grid */}
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center py-2">
                                <span className="font-bold text-gray-900">Name</span>
                                <span className="text-gray-900">John Doe.</span>
                            </div>

                            <div className="flex justify-between items-center py-2">
                                <span className="font-bold text-gray-900">Email</span>
                                <span className="text-gray-900">john@email.com</span>
                            </div>

                            <div className="flex justify-between items-center py-2">
                                <span className="font-bold text-gray-900">Phone</span>
                                <span className="text-gray-900">+1231341Z</span>
                            </div>

                            <div className="flex justify-between items-center py-2">
                                <span className="font-bold text-gray-900">Joining Date</span>
                                <span className="text-gray-900">02-24-2024</span>
                            </div>
                        </div>
                    </div>
                </Modal>
            </ConfigProvider>
        </>
    );
};

export default AllUsers;


