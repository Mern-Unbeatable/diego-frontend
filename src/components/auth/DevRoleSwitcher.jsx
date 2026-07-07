import { useDispatch } from 'react-redux';
import { forceRole } from '../../features/auth/authDevSlice';
import { ROLES } from '../../config/roles';

const DevRoleSwitcher = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => dispatch(forceRole(ROLES.PLATFORM_ADMIN))}>
          PLATFORM_ADMIN
        </button>

        <button onClick={() => dispatch(forceRole(ROLES.LICENSE_USER))}>
          LICENSE_USER
        </button>

        <button onClick={() => dispatch(forceRole(ROLES.PRIVATE_USER))}>
          PRIVATE_USER
        </button>

        <button onClick={() => dispatch(forceRole(ROLES.COMPANY_ADMIN))}>
          COMPANY_ADMIN
        </button>
      </div>
    </div>
  );
};

export default DevRoleSwitcher;
