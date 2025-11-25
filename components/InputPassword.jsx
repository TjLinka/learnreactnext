export default function InputPassword ({className = '', placholder=''}) {
    return (
      <input
        type="password"
        autoComplete="new-password"
        className={`${className} bg-white p-4 rounded-xl`}
        placeholder={placholder}
      />
    );
};