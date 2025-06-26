import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { motion } from "framer-motion";

import axiosInstanceProducts from "../../utils/axiosInstanceProducts";

import "../../style/addProduct.css";
import "../../style/category.css";

// Zod schema for product validation
const productSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.string().optional(),
  stock: z.string().optional(),
  categoryId: z.string().optional(),
  images: z.array(z.instanceof(File)).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface Category {
  _id: string;
  name: string;
}

interface RootState {
  auth: {
    userId: string;
  };
}

interface CategoryResponse {
  data: {
    categories: Category[];
  };
}

const AddProduct = () => {
  const navigate = useNavigate();
  const sellerId = useSelector((state: RootState) => state.auth.userId);
  const queryClient = useQueryClient();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  // Making the post req. for adding the product
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const formData = new FormData();

      formData.append("sellerId", sellerId);
      formData.append("title", data.title || "");
      formData.append("description", data.description || "");
      formData.append("price", data.price || "");
      formData.append("stock", data.stock || "");
      formData.append("categoryId", data.categoryId || "");

      data.images?.forEach((image: File) => {
        formData.append("images", image);
      });

      const response = await axiosInstanceProducts.post(
        "/myproducts/addproduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(data.message || "Product added successfully!", {
        duration: 3000,
      });
      navigate("/myproducts");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage, { duration: 3000 });
    },
  });

  // Making the GET req. for category
  const { data: CategoriesData } = useQuery<CategoryResponse>({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await axiosInstanceProducts.get("/category");
      return response.data;
    },
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length > 0) {
      setValue("images", files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  // framer motion animation states
  const fadeInVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="add_product_container"
      initial="hidden"
      animate="visible"
      variants={fadeInVariant}
    >
      <motion.h1 variants={fadeInVariant}>Add Product</motion.h1>
      <motion.p variants={fadeInVariant}>
        Boost your business—list your product and start selling today!
      </motion.p>

      <motion.form
        className="product_form_container"
        onSubmit={handleSubmit((data) => mutate(data))}
        variants={fadeInVariant}
      >
        <motion.div className="preview_image" variants={fadeInVariant}>
          {imagePreviews.length > 0 ? (
            imagePreviews.map((src, idx) => (
              <motion.img
                key={idx}
                src={src}
                alt={`Preview ${idx}`}
                className="preview-img"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            ))
          ) : (
            <motion.p variants={fadeInVariant}>No images selected</motion.p>
          )}
        </motion.div>

        <motion.div className="product_form" variants={fadeInVariant}>
          <motion.div className="field" variants={fadeInVariant}>
            <label>Images:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </motion.div>

          <motion.div className="field" variants={fadeInVariant}>
            <label htmlFor="title">Title</label>
            <input type="text" {...register("title")} />
          </motion.div>

          <motion.div className="field" variants={fadeInVariant}>
            <label>Description</label>
            <textarea {...register("description")} />
          </motion.div>

          <motion.div className="merge_field" variants={fadeInVariant}>
            <div className="field stock">
              <label>Stock</label>
              <input type="text" {...register("stock")} />
            </div>

            <div className="field price">
              <label>Price</label>
              <input type="text" {...register("price")} />
            </div>

            <div className="category_cell">
              <label>Category</label>
              <select className="category_field" {...register("categoryId")}>
                <option value="">Select a category</option>
                {CategoriesData?.data.categories?.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          <motion.div
            className="submit_btn"
            variants={fadeInVariant}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isPending ? "Adding Product..." : "Add Product"}
            </button>
          </motion.div>
        </motion.div>
      </motion.form>
    </motion.section>
  );
};

export default AddProduct;
