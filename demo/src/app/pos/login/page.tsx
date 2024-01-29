'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: '', password: '' });

      const res = await signIn('credentials', {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
      });

      setLoading(false);

      if (!res?.error) {
        router.push('/pos/dashboard');
      } else {
        setError('invalid email or password');
      }
    } catch (error) {
      setLoading(false);
      setError('unknown error');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <>
      <section className='bg-ct-blue-600 min-h-screen pt-20'>
        <div className='container mx-auto flex h-full items-center justify-center px-6 py-12'>
          <div className='bg-white px-8 py-10 md:w-8/12 lg:w-5/12'>
            <form onSubmit={onSubmit}>
              {error && (
                <p className='mb-6 rounded bg-red-300 py-4 text-center'>
                  {error}
                </p>
              )}
              <div className='mb-6'>
                <input
                  required
                  type='email'
                  name='email'
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder='Email address'
                  className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-5 text-sm font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                />
              </div>
              <div className='mb-6'>
                <input
                  required
                  type='password'
                  name='password'
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder='Password'
                  className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-5 text-sm font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                />
              </div>
              <button
                type='submit'
                style={{ backgroundColor: `${loading ? '#ccc' : '#3446eb'}` }}
                className='inline-block w-full rounded bg-blue-600 px-7 py-4 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'
                disabled={loading}
              >
                {loading ? 'loading...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
