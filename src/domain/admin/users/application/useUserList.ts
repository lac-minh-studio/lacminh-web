import { useEffect, useState } from 'react';
import { Title, Department, IUserItem, IUserFormInput } from '../model/User';
import { User_LIST } from '../infrastructure/user.api';

export function useUserList() {
    // State lưu trữ User và khởi tạo rỗng
    const [UserList, setUserList] = useState<IUserItem[]>([]);
    // State quản lý trạng thái hiển thị của modal (mở/đóng)
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mở/đóng modal thêm nhân viên
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    // State mới để lưu thông báo lỗi
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Giả lập việc gọi API bất đồng bộ
        const fetchUser = async () => {
            try {
                setIsLoading(true);

                await new Promise((resolve) => setTimeout(resolve, 500));

                //mở comment đoạn code dưới để test  api lỗi
                // throw new Error("Không thể kết nối đến Server");

                // Nếu thành công, set dữ liệu
                setUserList(User_LIST);
                setError(null); // Reset lỗi nếu trước đó có lỗi

            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                } else if (typeof e === 'string') {
                    setError(e);
                } else {
                    setError("Đã xảy ra lỗi không xác định");
                }
                setUserList([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Xử lý thêm mới nhân viên: tạo ID duy nhất từ timestamp, gán trạng thái mặc định 'Active' và cập nhật vào danh sách
    const handleAddUser = (input: IUserFormInput) => {
        const newItem: IUserItem = {
            id: Date.now().toString(),
            fullName: input.fullName,
            email: input.email,
            phone: input.phone,
            department: input.department as Department,
            title: input.title as Title,
            status: 'Active',
        };

        setUserList((prev) => [newItem, ...prev]);
        setIsModalOpen(false);
    };
    // Trả về các state và hàm xử lý để component bên ngoài sử dụng
    return {
        UserList,
        error,
        isLoading,
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        handleAddUser,
    };
}