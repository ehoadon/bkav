    // Firebase init
    const firebaseConfig = {
      apiKey: "AIzaSyDsdrQakeA8iZ3iVerSNRvXC9bneyzluSU",
      authDomain: "ehoadon-bkav.firebaseapp.com",
      projectId: "ehoadon-bkav"
    };
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    const reEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    // Elements
    const loginContainer = document.getElementById('login-container');
    const panelLogin     = document.getElementById('panel-login');
    const panelSignup    = document.getElementById('panel-signup');
    const panelReset     = document.getElementById('panel-reset');
    const authEmailInput = document.getElementById('auth-email');
    const authEmailTick  = document.getElementById('auth-email-tick');
    const signupEmailIn  = document.getElementById('signup-email');
    const signupEmailTick= document.getElementById('signup-email-tick');
    const authError      = document.getElementById('authError');
    const signupError    = document.getElementById('signupError');
    const resetError     = document.getElementById('resetError');
    const mainContent    = document.getElementById('main-content');
    const dashboard      = document.getElementById('dashboard');
    const userArea       = document.getElementById('userArea');
    const btnBack        = document.getElementById('btnBack');

    // Panel toggles
    document.getElementById('show-signup').onclick = e => { e.preventDefault(); panelLogin.style.display = 'none'; panelSignup.style.display = 'block'; };
    document.getElementById('show-login').onclick  = e => { e.preventDefault(); panelSignup.style.display = 'none'; panelLogin.style.display = 'block'; };
    document.getElementById('show-reset').onclick  = e => { e.preventDefault(); panelLogin.style.display = 'none'; panelReset.style.display = 'block'; };
    document.getElementById('back-to-login').onclick = e => { e.preventDefault(); panelReset.style.display = 'none'; panelLogin.style.display = 'block'; };

    // Email format check
    function checkFormat(input, tick) {
      const val = input.value.trim();
      if (!val) { tick.className = 'tick none'; tick.textContent = ''; return; }
      if (reEmail.test(val)) { tick.className = 'tick valid'; tick.textContent = '✔️'; }
      else                { tick.className = 'tick invalid'; tick.textContent = '❌'; }
    }
    authEmailInput.addEventListener('input', () => checkFormat(authEmailInput, authEmailTick));
    signupEmailIn.addEventListener('input', () => checkFormat(signupEmailIn, signupEmailTick));

    // Error formatting
    function fmtErr(e) {
      switch(e.code) {
        case 'auth/invalid-email':        return 'Email không hợp lệ.';
        case 'auth/email-already-in-use': return 'Email đã được đăng ký.';
        case 'auth/user-not-found':       return 'Không tìm thấy tài khoản.';
        case 'auth/wrong-password':       return 'Sai mật khẩu.';
        default:                          return e.message;
      }
    }

    // Auto logout khi qua ngày
    setInterval(() => {
      const lastDay = localStorage.getItem('lastLoginDay');
      const today   = new Date().toDateString();
      if (lastDay && lastDay !== today) auth.signOut();
    }, 60000);

    // Auth state listener
    auth.onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem('lastLoginDay', new Date().toDateString());
        loginContainer.style.display = 'none';
        mainContent.style.display    = 'block';
        // Greeting + logout + dashboard
        const name = user.email.split('@')[0];
        let html = `👋 <strong>${name}</strong> <button id="btnLogout">Đăng xuất</button>`;
        if (user.email === 'thanghdb@bkav.com') {
          html += ` <a href="#" id="linkDashboard">Dashboard</a>`;
        }
        userArea.innerHTML = html;
        document.getElementById('btnLogout').onclick = () => auth.signOut();
        if (user.email === 'thanghdb@bkav.com') {
          document.getElementById('linkDashboard').onclick = e => {
            e.preventDefault();
            mainContent.style.display = 'none';
            dashboard.style.display   = 'block';
          };
        }
      } else {
        loginContainer.style.display = 'flex';
        mainContent.style.display    = 'none';
        dashboard.style.display      = 'none';
        userArea.innerHTML           = '';
      }
    });

    // Login
    document.getElementById('btnLogin').onclick = () => {
      const email = authEmailInput.value.trim();
      const pass  = document.getElementById('auth-password').value.trim();
      authError.textContent = '';
      if (!email || !pass) { authError.textContent = 'Nhập đầy đủ thông tin.'; return; }
      const persistence = document.getElementById('rememberMe')?.checked
        ? firebase.auth.Auth.Persistence.LOCAL
        : firebase.auth.Auth.Persistence.SESSION;
      auth.setPersistence(persistence)
        .then(() => auth.signInWithEmailAndPassword(email, pass))
        .catch(e => authError.textContent = fmtErr(e));
    };

    // Signup
    document.getElementById('btnSignup').onclick = () => {
      const email = signupEmailIn.value.trim();
      const pass  = document.getElementById('signup-password').value.trim();
      signupError.textContent = '';
      if (!email || !pass) { signupError.textContent = 'Nhập đầy đủ thông tin.'; return; }
      if (!reEmail.test(email)) { signupError.textContent = 'Email không hợp lệ.'; return; }
      auth.createUserWithEmailAndPassword(email, pass)
        .catch(e => signupError.textContent = fmtErr(e));
    };

    // Reset password
    document.getElementById('btnSendLink').onclick = () => {
      const email = document.getElementById('reset-email').value.trim();
      const err   = resetError;
      err.textContent = '';
      if (!email) { err.textContent = 'Nhập email.'; return; }
      if (!reEmail.test(email)) { err.textContent = 'Email không hợp lệ.'; return; }
      auth.fetchSignInMethodsForEmail(email)
        .then(methods => {
          if (methods.length === 0) {
            err.textContent = 'Email chưa được đăng ký.';
          } else {
            return auth.sendPasswordResetEmail(email)
              .then(() => alert('Đã gửi link khôi phục!'))
              .catch(e => err.textContent = fmtErr(e));
          }
        })
        .catch(() => err.textContent = 'Không thể kiểm tra email.');
    };

    // Back from dashboard
    btnBack.onclick = () => {
      dashboard.style.display = 'none';
      mainContent.style.display = 'block';
    };
