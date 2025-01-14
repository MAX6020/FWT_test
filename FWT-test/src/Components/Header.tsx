import logo_dark from "../assets/svg/logo_dark.svg";
import logo_light from "../assets/svg/logo_light.svg";
import theme_dark from "../assets/svg/theme_dark.svg";
import theme_light from "../assets/svg/theme_light.svg";
import style from "../assets/style/components/header.module.scss";

interface IProps{
  theme: string
  setTheme: (state:string) => void
}

const Header = ({theme, setTheme}: IProps) => {
  const handleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  const logoTheme = () => {
    return theme === "light" ? logo_light : logo_dark
  }
  const btnTheme = () => {
    return theme === "light" ? theme_light : theme_dark
  }

  return (
    <header className={style.header}>
      <img src={logoTheme()} alt="#" />
      <button onClick={handleTheme} className={style.theme}>
        <img src={btnTheme()} alt="#" />
      </button>
    </header>
  );
};

export default Header;
