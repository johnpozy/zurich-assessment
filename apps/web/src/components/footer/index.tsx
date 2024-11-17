export const Footer = () => {
  return (
    <div className="flex justify-center items-center h-10 bg-gray-100">
      <span className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} All rights reserved.
      </span>
    </div>
  );
}

export default Footer;
