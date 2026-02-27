import { Oval } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader}>
      <Oval
        height={40}
        width={40}
        color="#2563eb"
        secondaryColor="#93c5fd"
        strokeWidth={4}
        ariaLabel="loading"
      />
    </div>
  );
}
