import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const AdminBanners = () => {
  const [banners, setBanners] = useState([]);
  const [refetch, setRefetch] = useState(false);
  console.log(banners);

  useEffect(() => {
    getBanners();
  }, [refetch]);

  const getBanners = async () => {
    try {
      const res = await fetch(`${apiUrl}/banner`, {
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setBanners(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm("are you sure to delete");
      if (!confirm) return;
      const res = await fetch(`${apiUrl}/banner/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      console.log(res);
      if (res.ok) {
        setRefetch((prev) => !prev);
        toast.success("banner deleted ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap p-5 md:p-10 gap-3">
      {banners?.data?.map((item) => (
        <div
          key={item._id}
          className="max-w-sm gap-5 relative rounded overflow-hidden"
        >
          <img src={item.image} alt="" className="p-1 border" />

          <Icon
            onClick={() => handleDelete(item._id)}
            icon="line-md:close-small"
            className="cursor-pointer hover:bg-black duration-300 top-0 right-0 absolute text-white rounded-full p-px bg-red-600"
            width={30}
          />
        </div>
      ))}
    </div>
  );
};

export default AdminBanners;
