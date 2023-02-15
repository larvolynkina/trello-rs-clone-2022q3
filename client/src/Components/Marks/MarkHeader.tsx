type MarkHeaderProps = {
  isShow: (b: boolean) => void;
};

function MarkHeader({ isShow }: MarkHeaderProps) {
  return (
    <div className="marks__header">
      <p className="marks__title">Метки</p>
      <button type="button" className="marks__close-btn" onClick={() => isShow(false)}>
        <span className="marks__cross-btn" />
      </button>
    </div>
  );
}

export default MarkHeader;
