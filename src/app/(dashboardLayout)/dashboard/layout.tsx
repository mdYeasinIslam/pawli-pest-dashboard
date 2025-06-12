

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  //  useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   // Check if the token is present in localStorage
  //   if (!token) {
  //     // If no token is found, redirect to the login page
  //     if (typeof window !== "undefined") {
  //       // redirect("/logIn");
  //        window.location.href = "/";
  //     }
  //   }
  // }, []);

  return (
    <div>
      {/* <Navbar /> */}
        {children}
      {/* <Footer /> */}
    </div>
  );
}
