//reducer quản lý state của ứng dụng.  ; định nghĩa các reducer để xử lý các action được gửi đến từ các saga.

// Trong đó, loggedIn là biến state để xác định trạng thái đăng nhập của người dùng. 
// loading là biến state để xác định trạng thái loading khi thực hiện đăng nhập. 
// error là biến state để xác định lỗi nếu có khi đăng nhập.
const initialState = {
    loggedIn: false,
    loading: false,
    error: null,
  };
  
  function appReducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN_REQUEST':
        return { ...state, loading: true, error: null };
      case 'LOGIN_SUCCESS':
        return { ...state, loggedIn: true, loading: false };
      case 'LOGIN_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'LOGOUT':
        return { ...state, loggedIn: false };
      default:
        return state;
    }
  }
  
  export default appReducer;