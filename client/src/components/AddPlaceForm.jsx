import Button from "./Button";

function AddPlaceForm({ children, onSubmit, className = '', submitLabel = 'Add Place', submitVariant = 'primary', submitWidth = 'auto' }) {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
      <Button type="submit" variant={submitVariant} width={submitWidth}>
        {submitLabel}
      </Button>
    </form>
  );
}

export default AddPlaceForm;