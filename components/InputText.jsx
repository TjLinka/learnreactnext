export default function InputText ({className = '', placholder='', onInput}) {
    return (
      <input
        type="text"
        autoComplete="new-password"
        onInput={(e) => onInput(e.target.value)}
        className={`${className} bg-white p-4 rounded-xl outline-0`}
        placeholder={placholder}
      />
    );
};