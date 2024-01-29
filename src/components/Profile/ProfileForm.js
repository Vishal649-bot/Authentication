import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const newPasswordInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault(); // Fixed the typo here

    // Ensure newPasswordInputRef.current is not null before accessing its value
    const enteredNewPassword = newPasswordInputRef.current ? newPasswordInputRef.current.value : '';

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB1l-W7Gk9gFUIs51AXNp0SEHcZEil4dVU", {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      // Handle response here
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
