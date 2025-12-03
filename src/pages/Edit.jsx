import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    image: "",
    description: "",
    available: "",
    category: "tour nội địa",
    active: true,
  });

  // Lấy tour theo ID
  useEffect(() => {
    axios
      .get(`http://localhost:3000/tours/${id}`)
      .then((res) => setTour(res.data))
      .catch(() => alert("Không tìm thấy tour!"));
  }, [id]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTour({ ...tour, [name]: value });
  };

  // Submit update
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/tours/${id}`, tour)
      .then(() => {
        alert("Cập nhật tour thành công!");
        navigate("/list");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Cập nhật tour</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Tên tour</label>
          <input
            type="text"
            name="name"
            value={tour.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Destination */}
        <div>
          <label className="block font-medium mb-1">Điểm đến</label>
          <input
            type="text"
            name="destination"
            value={tour.destination}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block font-medium mb-1">Thời gian</label>
          <input
            type="text"
            name="duration"
            value={tour.duration}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Giá</label>
          <input
            type="number"
            name="price"
            value={tour.price}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium mb-1">URL ảnh</label>
          <input
            type="text"
            name="image"
            value={tour.image}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Mô tả</label>
          <textarea
            name="description"
            value={tour.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        {/* Available */}
        <div>
          <label className="block font-medium mb-1">Số lượng còn</label>
          <input
            type="number"
            name="available"
            value={tour.available}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Danh mục</label>
          <select
            name="category"
            value={tour.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="tour nội địa">Tour nội địa</option>
            <option value="tour quốc tế">Tour quốc tế</option>
          </select>
        </div>

        {/* Active */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="active"
            checked={tour.active}
            onChange={(e) => setTour({ ...tour, active: e.target.checked })}
            className="h-4 w-4 text-blue-600"
          />
          <label className="text-gray-700">Kích hoạt</label>
        </div>

        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Cập nhật tour
        </button>
      </form>
    </div>
  );
}

export default Edit;