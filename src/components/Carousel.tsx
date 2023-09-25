import { useState } from "react";

const Carousel = () => {
  const [activeImage, setActiveImage] = useState(1);

  console.log("activeImage : ---------------", activeImage);

  const imgURL1 =
    "https://images.unsplash.com/photo-1692475684393-d4dcba84309f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8TThqVmJMYlRSd3N8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=60";
  const imgURL2 =
    "https://images.unsplash.com/photo-1666972339042-53128a2819bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=1600&q=60";
  const imgURL3 =
    "https://images.unsplash.com/photo-1687530450488-82552de2dac8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=1600&q=60";
  return (
    <>
      <div className="carousel">
        <ul className="carousel__slides">
          <input
            type="radio"
            name="radio-button"
            id="img-1"
            checked={activeImage === 1}
            readOnly
          />
          <li className="carousel__slide-container">
            <div className="carousel__slide-img">
              <img src={imgURL1} alt="슬라이드 이미지 1번" />
            </div>
            <div className="carousel__controls">
              <label
                onClick={() => setActiveImage(3)}
                className="carousel__slide-prev">
                <span>&lsaquo;</span>
              </label>
              <label
                onClick={() => setActiveImage(2)}
                className="carousel__slide-next">
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <input
            type="radio"
            name="radio-button"
            id="img-2"
            checked={activeImage === 2}
            readOnly
          />
          <li className="carousel__slide-container">
            <div className="carousel__slide-img">
              <img src={imgURL2} alt="슬라이드 이미지 2번" />
            </div>
            <div className="carousel__controls">
              <label
                onClick={() => setActiveImage(1)}
                className="carousel__slide-prev">
                <span>&lsaquo;</span>
              </label>
              <label
                onClick={() => setActiveImage(3)}
                className="carousel__slide-next">
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <input
            type="radio"
            name="radio-button"
            id="img-3"
            checked={activeImage === 3}
            readOnly
          />
          <li className="carousel__slide-container">
            <div className="carousel__slide-img">
              <img src={imgURL3} alt="슬라이드 이미지 3번" />
            </div>
            <div className="carousel__controls">
              <label
                onClick={() => setActiveImage(2)}
                className="carousel__slide-prev">
                <span>&lsaquo;</span>
              </label>
              <label
                onClick={() => setActiveImage(1)}
                className="carousel__slide-next">
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <div className="carousel__dots">
            <label
              onClick={() => setActiveImage(1)}
              className="carousel__dot"
              id="img-dot-1"
            />
            <label
              onClick={() => setActiveImage(2)}
              className="carousel__dot"
              id="img-dot-2"
            />
            <label
              onClick={() => setActiveImage(3)}
              className="carousel__dot"
              id="img-dot-3"
            />
          </div>
        </ul>
      </div>
    </>
  );
};

export default Carousel;
