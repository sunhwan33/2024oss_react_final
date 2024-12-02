import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

const Header = () => {
  return (
    <header className="bg-light py-3">
      <div className="container d-flex justify-content-between align-items-center">
        {/* 왼쪽 로고 및 텍스트 */}
        <div className="d-flex align-items-center">
          <img
            src="/handong.png"
            alt="한동대학교 도서관 로고"
            style={{ width: "60px", marginRight: "15px" }} // 로고와 텍스트 간 간격
          />
          <h1 className="mb-0" style={{ fontSize: "1.5rem" }}>
            한동대학교 도서관
          </h1>
        </div>

        {/* 오른쪽 버튼 */}
        <div className="header-right">
        <a
          href="https://www.nl.go.kr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/nl.svg"
            alt="국립중앙도서관 로고"
            className="national-library-logo"
          />
        </a>
      </div>
      </div>
    </header>
  );
};

export default Header;
