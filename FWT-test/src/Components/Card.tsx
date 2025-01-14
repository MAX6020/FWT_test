import { useState } from "react";
import style from "../assets/style/components/card.module.scss";
import { useAppSelector } from "../hooks/redux";
import { IImages } from "../redux/slice/imagesSlice";
import { motion } from "framer-motion";

interface IProps {
  image: IImages;
}

// сделать пропсам интерфейсы
const Card = ({ image }: IProps) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const { authors } = useAppSelector((state) => state.authorsReducer);
  const { locations } = useAppSelector((state) => state.locationsReducer);
  const getAuthor = () => {
    return authors.find((el) => el.id === image.authorId)?.name;
  };
  const getLocation = () => {
    return locations.find((el) => el.id === image.locationId)?.location;
  };
  const enterInfo = () => {
    setShowInfo(true);
  };
  const leaveInfo = () => {
    setShowInfo(false);
  };

  return (
    <div
      onMouseEnter={enterInfo}
      onMouseLeave={leaveInfo}
      className={style.card}
    >
      <img
        className={style.card_img}
        src={"https://test-front.framework.team" + image.imageUrl}
        alt=""
      />
      <div className={style.card_info}>
        {!showInfo && (
          <motion.div
            initial={!showInfo}
            animate={{ opacity: [0, 1], transition: { duration: 0.3 } }}
            className={style.card_info_flex}
          >
            <h1>{image.name}</h1>
            <p>{image.created}</p>
          </motion.div>
        )}
        {showInfo && (
          <motion.div
            initial={showInfo}
            animate={{ opacity: [0, 1], transition: { duration: 0.3 } }}
            className={style.card_info_flex}
          >
            <h1>{getAuthor()}</h1>
            <p>{getLocation()}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Card;
