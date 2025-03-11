import React, { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from 'lucide-react';

function ProductPage() {
  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    fetchProduct(id)
  }, [fetchProduct, id])

  const handleDelete = async () => {
    if(window.confirm("Are you sure you want to delete this item?")) {
      await deleteProduct(id);
      navigate("/");
    }
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='loading loading-spinner loading-lg' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='alert alert-error'>{error}</div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <button onClick={() => navigate("/")} className='btn btn-ghost mb-8'>
        <ArrowLeftIcon className='size-4 mr-2' />
        Back to Products
      </button>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Product Image */}
        <div className='rounded-lg overflow-hidden sha bg-base-100'>
          <img 
            src={currentProduct?.image}
            alt={currentProduct?.name}
            className='size-full object-cover'
          />
        </div>

        {/* Form */}
        <div className='card bg-base-100 shadow-lg'>
          <div className='card-body'>
            <h2 className='card-title text-2xl mb-6'>Edit Product</h2>

            <form onSubmit={(e) => {
              e.preventDefault();
              updateProduct(id);
            }} 
            className='space-y-6'>
              {/* Product Name */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-base font-medium'>Product Name</span>
                </label>
                <input 
                  type='text'
                  placeholder='Enter product name'
                  className='input input-bordered w-full'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Product Price */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-base font-medium'>Product Price</span>
                </label>
                <input 
                  type='number'
                  min='0'
                  step='0.01'
                  placeholder='Enter product price'
                  className='input input-bordered w-full'
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              {/* Product Image URL */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-base font-medium'>Image URL</span>
                </label>
                <input 
                  type='file' 
                  accept='image/*'
                  className='input input-bordered w-full py-2 focus:input-primary transition-colors duration-200' 
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} 
                />
              </div>

              {/* Form Actions */}
              <div className='flex justify-between mt-8'>
                <button type='button' onClick={handleDelete} className='btn btn-error'>
                  <Trash2Icon className='size-4 mr-2' />
                  Delete Product
                </button>

                <button 
                  type='submit'
                  className='btn btn-primary'
                  disabled={loading || !formData.name || !formData.price || !formData.image}
                >
                  {loading ? (
                    <span className='loading loading-spinner loading-sm' />
                  ) : (
                    <>
                      <SaveIcon className='size-4 mr-2' />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductPage