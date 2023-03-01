//Trong đó, login là action để gửi thông tin đăng nhập từ component đăng nhập đến saga.

export function login(credentials) {
    console.log(11111);
    return { 
        type: 'LOGIN', 
        payload: credentials 
    };
}
  