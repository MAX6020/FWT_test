import style from "../assets/style/components/pagination.module.scss";
import left_light from "../assets/svg/arrow-left_light.svg";
import left_dark from "../assets/svg/arrow-left_dark.svg";
import right_light from "../assets/svg/arrow-right_light.svg";
import right_dark from "../assets/svg/arrow-right_dark.svg";
import { useAppSelector } from "../hooks/redux";
import { useEffect, useState } from "react";

interface IProps {
  page: number;
  theme: string;
  setPage: (state: number) => void;
}

const Pagination = ({ page, theme, setPage }: IProps) => {
  const { totalCount } = useAppSelector((state) => state.imagesReducer);
  const [leftPages, setLeftPages] = useState<boolean>(false);
  const [rightPages, setRightPages] = useState<boolean>(false);
  const [showPagesList, setShowPagesList] = useState<number[]>([]);
  const [pages, setPages] = useState<number[]>([]);

  const totalPage = () => {
    let page;
    let tempPages = [];
    if (totalCount % 6 === 0) {
      page = totalCount / 6;
    } else {
      page = Math.round(totalCount / 6 + 1 - (totalCount % 6) / 6);
    }
    for (let i = 1; i <= page; i++) {
      tempPages.push(i);
    }
    setPages(tempPages);
  };

  const leftTheme = () => {
    return theme === "light" ? left_light : left_dark;
  };
  const rightTheme = () => {
    return theme === "light" ? right_light : right_dark;
  };

  const showPages = () => {
    let leftKey = false;
    let rightKey = false;
    let showPagesList: number[] = [];
    if (pages.length <= 4) {
      setShowPagesList(
        new Array(pages.length).fill(0).map((_el, index) => index + 1)
      );
      setLeftPages(leftKey);
      setRightPages(rightKey);
      return;
    }
    if (page >= 3) {
      leftKey = true;
    }
    if (pages.length - 2 >= page) {
      rightKey = true;
    }
    if (leftKey && rightKey) {
      showPagesList = [page - 1, page, page + 1];
    }
    if (!leftKey && rightKey) {
      showPagesList = [1, 2, 3];
    }
    if (leftKey && !rightKey) {
      showPagesList = [pages.length - 2, pages.length - 1, pages.length];
    }
    setShowPagesList(showPagesList);
    setLeftPages(leftKey);
    setRightPages(rightKey);
  };

  useEffect(() => {
    showPages();
  }, [page, pages]);
  useEffect(() => {
    totalPage();
  }, [totalCount]);

  return (
    <div className={style.pagination}>
      <img
        className={style.pagination_arrow}
        onClick={() => setPage(page - 1)}
        src={leftTheme()}
        alt=""
      />
      <div className={style.pagination_flex}>
        {leftPages && (
          <>
            <span
              onClick={() => setPage(pages[0])}
              className={style.pagination_page}
            >
              {pages[0]}
            </span>
            {showPagesList[0] - 1 != pages[0] ? (
              <span className={style.pagination_page_disable}>...</span>
            ) : null}
          </>
        )}
        {showPagesList.map((el) => (
          <span
            key={el}
            onClick={() => setPage(el)}
            className={style.pagination_page}
          >
            {el}
          </span>
        ))}
        {rightPages && (
          <>
            {showPagesList[showPagesList.length - 1] + 1 !=
            pages[pages.length - 1] ? (
              <span className={style.pagination_page_disable}>...</span>
            ) : null}
            <span
              onClick={() => setPage(pages[pages.length - 1])}
              className={style.pagination_page}
            >
              {pages[pages.length - 1]}
            </span>
          </>
        )}
      </div>
      <img
        className={style.pagination_arrow}
        onClick={() => setPage(page + 1)}
        src={rightTheme()}
        alt=""
      />
    </div>
  );
};

export default Pagination;
