import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logout } from '../../redux/features/userSlice';
function useAutoLogout() {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkExpiration = () => {
            const loginTimestamp = localStorage.getItem('loginTimestamp');
            if (loginTimestamp) {
                const now = Date.now();
                const thirtyMinutes = 30 * 60 * 1000;
                if (now - loginTimestamp > thirtyMinutes) {
                    dispatch(logout());
                }
            }
        };
        const interval = setInterval(checkExpiration, 1000 * 60); // Check every minute
        return () => clearInterval(interval);
    }, [dispatch]);
}

export default useAutoLogout;