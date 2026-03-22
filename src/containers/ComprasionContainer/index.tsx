import { Title } from "../../components/Title";
import { useComprasionData } from "../../hooks/useComprasionData";
import "./styles.scss";

export const ComprasionContainer = () => {
  const { comprasionData } = useComprasionData();

  return (
    <div className="comprasion">
      <Title>Фильмы в сравнении</Title>
      <div className="comprasion__table">
        <table className="comprasion__table-block">
          <tbody>
            <tr className="comprasion__table-head">
              <td className="comprasion__table-base">Название</td>
              {comprasionData.map((film) => (
                <td key={film.id} className="comprasion__table-title">{film?.name ?? film?.alternativeName ?? `-`}</td>
              ))}
            </tr>
            <tr>
              <td className="comprasion__table-base">Год выпуска</td>
              {comprasionData.map((film) => (
                <td key={film.id}>{film?.year ?? `-`}</td>
              ))}
            </tr>
            <tr>
              <td className="comprasion__table-base">Рейтинг</td>
              {comprasionData.map((film) => (
                <td key={film.id}>⭐ {film?.rating?.kp ?? `-`} (kp)</td>
              ))}
            </tr>
            <tr>
              <td className="comprasion__table-base">Жанры</td>
              {comprasionData.map((film) => (
                <td key={film.id}>
                  {film?.genres?.map((genre: any) => genre.name).join(", ") ?? `-`}
                </td>
              ))}
            </tr>
            <tr>
              <td className="comprasion__table-base">Длительность</td>
              {comprasionData.map((film) => (
                <td key={film.id}>{film?.movieLength ? `${film?.movieLength} min` : `-`}</td>
              ))}
            </tr>
          </tbody>  
        </table>
      </div>
    </div>
  );
};
