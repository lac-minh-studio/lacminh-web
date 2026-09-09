import { useEffect, useState } from 'react';
import { Title, Department, IStaffItem, IStaffFormInput } from '../model/staff';
import { STAFF_LIST } from '../infrastructure/staff.api';

export function useStaffList() {
    // State lưu trữ staff và khởi tạo rỗng
    const [staffList, setStaffList] = useState<IStaffItem[]>([]);
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
        const fetchStaff = async () => {
            try {
                setIsLoading(true);
                // Giả lập network delay
                await new Promise((resolve) => setTimeout(resolve, 500));

                //mở comment đoạn code dưới để test  api lỗi
                // throw new Error("Không thể kết nối đến Server");

                // Nếu thành công, set dữ liệu
                setStaffList(STAFF_LIST);
                setError(null); // Reset lỗi nếu trước đó có lỗi

            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                } else if (typeof e === 'string') {
                    setError(e);
                } else {
                    setError("Đã xảy ra lỗi không xác định");
                }
                setStaffList([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStaff();
    }, []);

    // Xử lý thêm mới nhân viên: tạo ID duy nhất từ timestamp, gán trạng thái mặc định 'Active' và cập nhật vào danh sách
    const handleAddStaff = (input: IStaffFormInput) => {
        const newItem: IStaffItem = {
            id: Date.now().toString(),
            fullName: input.fullName,
            email: input.email,
            phone: input.phone,
            department: input.department as Department,
            title: input.title as Title,
            status: 'Active',
        };

        setStaffList((prev) => [newItem, ...prev]);
        setIsModalOpen(false);
    };
    // Trả về các state và hàm xử lý để component bên ngoài sử dụng
    return {
        staffList,
        error,
        isLoading,
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        handleAddStaff,
    };
}