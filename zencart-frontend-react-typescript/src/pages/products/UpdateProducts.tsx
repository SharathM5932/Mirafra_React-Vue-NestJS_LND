import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

import axiosInstanceProducts from "../../utils/axiosInstanceProducts";

import "../../style/addProduct.css";
import "../../style/category.css";

const productSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.string().optional(),
  stock: z.string().optional(),
  categoryId: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface Product {
  _id: string;
  title: string;
  description: string;
  price: string;
  stock: string;
  categoryId: string;
  images: string[];
}

interface Category {
  _id: string;
  name: string;
}

interface CategoriesResponse {
  data: {
    categories: Category[];
  };
}

interface UpdateResponse {
  message: string;
}

interface RootState {
  auth: {
    userId: string;
  };
}

// ---------------------- Component ----------------------

const UpdateProducts = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const sellerId = useSelector((state: RootState) => state.auth.userId);
  const queryClient = useQueryClient();
  const { state: productData } = useLocation() as { state: Product };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: productData || {},
  });

  // Making the PUT req. for updating the product
  const { mutate, isPending } = useMutation<
    UpdateResponse,
    any,
    ProductFormData
  >({
    mutationFn: async (data) => {
      const response = await axiosInstanceProducts.put<UpdateResponse>(
        `/myproducts/updateproduct/${productData._id}`,
        { sellerId, ...data }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(data.message || "Product updated successfully!", {
        duration: 3000,
      });
      navigate("/myproducts");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage, { duration: 3000 });
    },
  });

  // Making the GET req. for category
  const { data } = useQuery<CategoriesResponse>({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await axiosInstanceProducts.get<CategoriesResponse>(
        "/category"
      );
      return response.data;
    },
  });

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
    <motion.div
      className="add_product_container"
      initial="hidden"
      animate="visible"
      variants={fadeInVariant}
    >
      <motion.h1 variants={fadeInVariant}>Update Product</motion.h1>
      <motion.p variants={fadeInVariant}>
        Keep your products up to date and attract more buyers!
      </motion.p>

      <motion.form
        className="product_form_container"
        onSubmit={handleSubmit((data) => mutate(data))}
        variants={fadeInVariant}
      >
        <motion.div className="preview_image" variants={fadeInVariant}>
          {productData.images.length > 0 ? (
            <motion.img
              src={productData.images[0]}
              alt={productData.title}
              className="preview-img"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.p variants={fadeInVariant}>No images selected</motion.p>
          )}
        </motion.div>

        <motion.div className="product_form" variants={fadeInVariant}>
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
                {data?.data?.categories?.map((category) => (
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
              {isPending ? "Updating Product..." : "Update Product"}
            </button>
          </motion.div>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default UpdateProducts;
