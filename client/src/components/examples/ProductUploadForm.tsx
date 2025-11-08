import ProductUploadForm from '../ProductUploadForm';

export default function ProductUploadFormExample() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <ProductUploadForm
        onSubmit={(data) => console.log('Product uploaded:', data)}
      />
    </div>
  );
}
