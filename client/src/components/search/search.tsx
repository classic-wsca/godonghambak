import styled from 'styled-components';

import SearchIcon from '~public/svgs/search-icon.svg';
import { pixelToRem } from '~utils/style-utils';

interface SearchProps {
  id: string;
  value: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler;
  onSubmit: React.FormEventHandler;
}

const Search = ({
  id,
  value,
  placeholder,
  onChange,
  onSubmit,
}: SearchProps) => {
  return (
    <Form id={`${id}-form`} role="search" onSubmit={onSubmit}>
      <Label id={`${id}-label`} htmlFor={`${id}-input`}>
        Search
      </Label>
      <Input
        id={`${id}-input`}
        type="search"
        name={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <Button form={`${id}-form`} type="submit">
        <SearchIcon />
      </Button>
    </Form>
  );
};

const Form = styled.form`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${pixelToRem(8)};
  width: 100%;
  max-width: ${pixelToRem(280)};
  border-bottom: ${pixelToRem(2)} solid ${({ theme }) => theme.colors.dark};
`;

const Label = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  -webkit-clip-path: inset(50%);
  clip-path: inset(50%);
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
  overflow: hidden;
`;

const Input = styled.input`
  min-width: ${pixelToRem(80)};
  height: ${pixelToRem(32)};
  border: none;
  text-decoration-line: none;
  -webkit-appearance: none;

  &:focus {
    outline: 0 none;
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
`;

const Button = styled.button`
  padding: ${pixelToRem(2)};
  border-radius: ${pixelToRem(4)};

  &:hover {
    background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0 0);
  }
`;

export default Search;
