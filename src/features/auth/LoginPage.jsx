import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const schema = yup.object({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
});

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (values) => {
    if (login(values.email, values.password)) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mx-auto w-full" style={{ maxWidth: '28rem' }}>
          <div className="card-custom p-6">
            <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-400 mt-1">Sign in to shop faster and track your orders.</p>

          <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input {...register('email')} className="w-full mt-1 bg-transparent border border-[#2b2226] rounded-md p-3 text-gray-100" />
              {errors.email ? <span className="text-red-500 text-sm">{errors.email.message}</span> : null}
            </div>
            <div>
              <label className="text-sm text-gray-300">Password</label>
              <input type="password" {...register('password')} className="w-full mt-1 bg-transparent border border-[#2b2226] rounded-md p-3 text-gray-100" />
              {errors.password ? <span className="text-red-500 text-sm">{errors.password.message}</span> : null}
            </div>
            <button className="w-full primary-cta" type="submit">Login</button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-4">New here? <Link to="/register" className="text-[#f59e0b]">Create an account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
