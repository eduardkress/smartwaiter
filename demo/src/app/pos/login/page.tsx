"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const callbackUrl = "/pos/dashboard";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: "", password: "" });

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false);

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        console.log(res.error);
        setError("invalid email or password");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <>
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
            <form onSubmit={onSubmit}>
              {error && (
                <p className="text-center bg-red-300 py-4 mb-6 rounded">
                  {error}
                </p>
              )}
              <div className="mb-6">
                <input
                  required
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div className="mb-6">
                <input
                  required
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
                className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                disabled={loading}
              >
                {loading ? "loading..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
