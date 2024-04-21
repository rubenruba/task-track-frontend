import "./formInput.sass";

export const FormInput = (props: { forId: string, title: string, type: string, updateValue: Function }) => {

  return (
    <div className="form-input">
      <label htmlFor={props.forId}>{props.title}</label>
      <input
        id={props.forId}
        type={props.type}
        onChange={(event) => props.updateValue(props.forId, event.target.value)}
      />
    </div>
  );
};
