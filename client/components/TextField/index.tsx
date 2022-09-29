import React from "react";
import "./style.css";

const TextField = ({ handleChange }) => {
  return (
    <div class="form__group field">
      <input
        type="input"
        className="form__field"
        placeholder="Message"
        name="message"
        id="message"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e?.target?.value)
        }
      />
    </div>
  );
};

export default TextField;
