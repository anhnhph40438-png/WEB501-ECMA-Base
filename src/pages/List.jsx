import React, { useState, useEffect } from "react";
import axios from "axios";

function List() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/tours")
      .then((res) => setTours(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("bạn có chắc chắn muốn xóa tour này không?")) return;
    axios
      .delete(`http://localhost:3000/tours/${id}`)
      .then(() => setTours(tours.filter((t) => t.id !== id)))
      .catch((err) => console.log(err));
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
                <td className="px-4 py-2 border">
                  {tour.price.toLocaleString()} VND
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
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
