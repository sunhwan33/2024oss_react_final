import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Header from '../Header';
import { getThumbnailUrl, getThumbnailUrl2 } from '../utils';

const ListPage = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const navigate = useNavigate();
  const mockAPI = "https://672cb0b81600dda5a9f980b5.mockapi.io/api/v1/my_library";

  // Load data from the Mock API
  const loadData = async () => {
    try {
      const response = await fetch(mockAPI);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const handleUpdate = (bookId) => {
    navigate(`/update/${bookId}`);
  };

  const handleDelete = async (bookId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`${mockAPI}/${bookId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setData(data.filter((item) => item.no !== bookId)); // Update UI after deletion
          alert("삭제가 완료되었습니다.");
        } else {
          console.error("Failed to delete:", response.statusText);
          alert("삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div>
      <Header /> {/* Include the Header component */}
      <div className="container my-5">
      <h1 className="mb-4 text-center">대출현황·갱신</h1>

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>Actions</th>
            <th>No.</th>
            <th>도서명</th>
            <th>도서별칭</th>
            <th>저자명</th>
            <th>등록번호</th>
            <th>청구기호</th>
            <th>출판사명</th>
            <th>ISBN</th>
            <th>출판연도</th>
            <th>대출일</th>
            <th>반납예정일</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.no}>
                {/* Update and Delete Buttons */}
                <td>
                  <FaEdit
                    className="text-primary me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleUpdate(item.no)}
                  />
                  <FaTrash
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(item.no)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>
                  <a
                    href="#!"
                    className="text-primary text-decoration-underline"
                    onClick={() => handleBookClick(item)}
                  >
                    {item.book_name}
                  </a>
                </td>
                <td>{item.nickname}</td>
                <td>{item.writer}</td>
                <td>{item.register_code}</td>
                <td>{item.call_num}</td>
                <td>{item.publisher}</td>
                <td>{item.ISBN}</td>
                <td>{item.published_year}</td>
                <td>{item.rental_date}</td>
                <td>{item.return_date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>도서 상세 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {selectedBook ? (
          <div>
            <img
              src={getThumbnailUrl(selectedBook.controlNo)}
              alt="책 썸네일"
              className="img-thumbnail mb-3"
              style={{ width: "150px", height: "auto" }}
              onError={(e) => {
                if (e.target.src === getThumbnailUrl(selectedBook.controlNo)) {
                  e.target.src = getThumbnailUrl2(selectedBook.controlNo);
                } else {
                  e.target.src = "https://library.handong.edu/image/ko/solution/local/noCoverImg.jpg";
                }
              }}
            />
            <p><strong>도서명:</strong> {selectedBook.book_name}</p>
            <p><strong>저자명:</strong> {selectedBook.writer}</p>
            <p><strong>출판사명:</strong> {selectedBook.publisher}</p>
            <p><strong>출판연도:</strong> {selectedBook.published_year}</p>
            <p><strong>청구기호:</strong> {selectedBook.call_num}</p>
            <p><strong>등록번호:</strong> {selectedBook.register_code}</p>
            <p><strong>ISBN:</strong> {selectedBook.ISBN}</p>
          </div>
        ) : (
          <p>정보를 로드하는 중입니다...</p>
        )}
      </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
};

export default ListPage;
