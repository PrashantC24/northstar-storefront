import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string()
    .min(8, 'Password should be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain a special character')
    .required('Password is required'),
});

export default function RegisterPage() {
  const { register: createProfile } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (values) => {
    if (createProfile(values.name, values.email, values.password)) {
      navigate('/');
    }
  };

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mx-auto w-full" style={{ maxWidth: '28rem' }}>
          <div className="card-custom p-6">
            <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-gray-400 mt-1">Join Northstar for cashback offers and a faster checkout.</p>

          <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-sm text-gray-300">Name</label>
              <input {...register('name')} className="w-full mt-1 bg-transparent border border-[#2b2226] rounded-md p-3 text-gray-100" />
              {errors.name ? <span className="text-red-500 text-sm">{errors.name.message}</span> : null}
            </div>
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
            <button className="w-full primary-cta" type="submit">Register</button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-4">Already have an account? <Link to="/login" className="text-[#f59e0b]">Log in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
