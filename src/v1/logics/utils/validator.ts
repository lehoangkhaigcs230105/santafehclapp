/**
 * Kiểm tra 1 chuỗi có Null rỗng hay không
 * @param {*} stringText chuỗi Email cần kiểm
 * @returns true nếu khác rỗng Rỗng, false rỗng
 */
export const validateString = (stringText: any): boolean => {
    if (typeof stringText === 'number') {
        stringText = stringText.toString();
    }

    return typeof stringText === 'string' && stringText.trim().length > 0;
};

/**
 * Kiểm tra tính hợp lệ của Email.
 * Còn lỗi cho name@again@example.com => Sửa regexString /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 * @param {*} email chuỗi Email cần kiểm
 * @returns true nếu hợp lệ, false nếu không hợp lệ
 */
export const validateEmail = (email: string): boolean => {
    if (!validateString(email)) return false;

    const regexString = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexString.test(email);
};

/**
 * Kiểm tra mật khẩu có hợp lệ không
 * @param password Chuỗi mật khẩu cần kiểm tra
 * @returns true nếu hợp lệ, false nếu không
 */
export const validatePassword = (password: string): boolean => {
    if (typeof password !== 'string') return false;

    const minLength = 6;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
        password.length >= minLength &&
        hasLowercase &&
        hasUppercase &&
        hasDigit &&
        hasSpecialChar
    );
};

/**
 * Kiểm tra tính hợp lệ của số điện thoại
 * @param {*} phoneNo chuỗi số điện thoại cần kiểm (bắt đầu bằng số 0 và có chia cụm 2-3 cụm số)
 * @returns true nếu hợp lệ, false nếu không hợp lệ
 * // Chấp nhận:
    // - 0123456789
    // - 0123 456 789
    // - 0123 45 67 89
    // - 0123-456-789
    // - 0123.45.67.89
 */
export const validatePhoneNumber = (phoneNo: string): boolean => {
    if (!validateString(phoneNo)) return false;
    const regex = /^0\d{9}$|^0\d{3}([-. ]?\d{2}){3}$|^0\d{3}([-. ]?\d{3}){2}$/;
    return regex.test(phoneNo);
};

/**
 * Tìm vị trí index của phần tử value trong mảng arrayData
 * @param arrayData Mảng phải chứa trường id
 * @param value Giá trị cần tìm trong id của mảng
 * @returns index tính từ 0, hoặc -1 nếu không tìm thấy
 */
export const getArrayIndex = (arrayData: any[], value: any): number => {
    for (let index = 0; index < arrayData.length; index++) {
        if (arrayData[index].id === value) {
            return index;
        }
    }
    return -1;
};

/**
 * Kiểm tra chuỗi chỉ chứa số
 * @param value Chuỗi cần kiểm tra
 * @returns true nếu là số, false nếu không
 */
export const isNumeric = (value: string): boolean => /^\d+$/.test(value);




