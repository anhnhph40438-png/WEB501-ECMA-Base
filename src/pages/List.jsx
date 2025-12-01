import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function List() {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/tours")
      .then((res) => setTours(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tour này không?")) return;
    axios
      .delete(`http://localhost:3000/tours/${id}`)
      .then(() => setTours(tours.filter((t) => t.id !== id)))
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // chuyển sang trang sửa tour
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách tour</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Tên tour</th>
              <th className="px-4 py-2 border">Điểm đến</th>
              <th className="px-4 py-2 border">Thời gian</th>
              <th className="px-4 py-2 border">Giá</th>
              <th className="px-4 py-2 border">Ảnh</th>
              <th className="px-4 py-2 border">Mô tả</th>
              <th className="px-4 py-2 border">Số lượng còn</th>
              <th className="px-4 py-2 border">Danh mục</th>
              <th className="px-4 py-2 border">Kích hoạt</th>
              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{tour.id}</td>
                <td className="px-4 py-2 border">{tour.name}</td>
                <td className="px-4 py-2 border">{tour.destination}</td>
                <td className="px-4 py-2 border">{tour.duration}</td>
                <td className="px-4 py-2 border">{tour.price.toLocaleString()} VND</td>
                <td className="px-4 py-2 border">
                  {tour.image && (
                    <img src={tour.image} alt={tour.name} className="w-20 h-16 object-cover rounded" />
                  )}
                </td>
                <td className="px-4 py-2 border">{tour.description}</td>
                <td className="px-4 py-2 border">{tour.available}</td>
                <td className="px-4 py-2 border">{tour.category}</td>
                <td className="px-4 py-2 border">{tour.active ? 'Có' : 'Không'}</td>
                <td className="px-4 py-2 border">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(tour.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(tour.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tours.length === 0 && (
          <p className="text-center text-gray-500 mt-4">Không có dữ liệu!</p>
        )}
      </div>
    </div>
  );
}

export default List;