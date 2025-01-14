import { useEffect, useState } from "react";
import style from "../assets/style/page/Main.module.scss";
import Card from "../Components/Card";
import Header from "../Components/Header";
import Search from "../Components/Search";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useTheme } from "../hooks/UseTheme";
import {
  fetchAuthors,
  fetchImages,
  fetchLocations,
} from "../redux/api/ActionCreators";
import Pagination from "../Components/Pagination";

const Main = () => {
  const { theme, setTheme } = useTheme();
  const { field } = useAppSelector((state) => state.searchReducer);
  const dispatch = useAppDispatch();
  const { images } = useAppSelector((state) => state.imagesReducer);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchImages({ page: page, limit: 6, field: field }));
    dispatch(fetchAuthors());
    dispatch(fetchLocations());
  }, [page, field]);

  return (
    <div className={style.container}>
      <Header theme={theme} setTheme={setTheme} />
      <Search theme={theme} />
      <div className={style.grid}>
        {images.map((item) => (
          <Card key={item.id} image={item}></Card>
        ))}
      </div>
      <Pagination page={page} theme={theme} setPage={setPage} />
    </div>
  );
};

export default Main;

// сделать загрузку
