import { useState, useEffect, useRef } from "react";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import axios from "axios";

function Menu() {
  const tabsRef = useRef(null);

  const admin = localStorage.getItem("admin") == "yes" ? true : false;
  const [activeSection, setActiveSection] = useState("Indo-Chinese-Starters");

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [dragging, setDragging] = useState(false);

  const [menuItems, setMenuData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add', 'edit', 'delete'
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  // Loading and validation states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingItem, setSavingItem] = useState(false);
  const [deletingItem, setDeletingItem] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Toast notification helper
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  useEffect(() => {
    // Fetch menu data from API
    setLoading(true);
    axios
      .get("https://arya-server.onrender.com/api/menu")
      .then((response) => {
        console.log("API Response:", response.data); // Debug log
        let apiMenuData = response.data;

        // Handle different API response structures
        if (apiMenuData.items) {
          // If API returns {items: [...]}
          setMenuData(apiMenuData.items);
          const cats = [
            ...new Set(apiMenuData.items.map((item) => item.category)),
          ];
          setCategories([
            "Indo-Chinese-Starters",
            "Harmony-Starters-Japanese",
            "Innovation-Starters-Chinese",
            "Thai-Starters",
            "Heritage-Starters-Indian",
            "Special-Soya-Chaap",
            "Japanese Tappenyaki",
            "Japanese-Ramen",
            "Japanese-Teriyaki",
            "Chinese Mains",
            "Transformation-Mains-Thai",
            "Pad-Thai-Noodles",
            "Wraps",
            "Burgers",
            "Vegetarian-Delights",
            "Non- veg Curries",
            "Non-veg Biryani",
            "Veg-Biryani",
            "Rice",
            "Breads",
            "Sides",
            "Desserts",
            "5 phase journey bundle",
          ]);
        } else if (Array.isArray(apiMenuData)) {
          setMenuData(apiMenuData);
          const cats = [...new Set(apiMenuData.map((item) => item.category))];
          console.log("Categories found:", cats); // Debug log
          setCategories([
            "Indo-Chinese-Starters",
            "Harmony-Starters-Japanese",
            "Innovation-Starters-Chinese",
            "Thai-Starters",
            "Heritage-Starters-Indian",
            "Special-Soya-Chaap",
            "Japanese Tappenyaki",
            "Japanese-Ramen",
            "Japanese-Teriyaki",
            "Chinese Mains",
            "Transformation-Mains-Thai",
            "Pad-Thai-Noodles",
            "Wraps",
            "Burgers",
            "Vegetarian-Delights",
            "Non- veg Curries",
            "Non-veg Biryani",
            "Veg-Biryani",
            "Rice",
            "Breads",
            "Sides",
            "Desserts",
            "5 phase journey bundle",
          ]);
        } else {
          console.error("Unexpected API response structure:", apiMenuData);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
        // Set empty arrays if API fails
        setMenuData([]);
        setCategories([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem("cartItems");
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
      console.error("Error loading cart items:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart items:", error);
    }
  }, [cartItems]);

  // Modal functions
  const openModal = (type, item = null, categoryName = null) => {
    setModalType(type);
    setSelectedItem(item);
    if (type === "edit" && item) {
      setFormData({
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
        category: item.category,
      });
    } else if (type === "add") {
      setFormData({
        name: "",
        price: "",
        description: "",
        image: "",
        category: categoryName || activeSection,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    // Prevent closing modal during operations
    if (savingItem || deletingItem || uploadingImage) {
      return;
    }

    setShowModal(false);
    setSelectedItem(null);
    setFormData({
      name: "",
      price: "",
      description: "",
      image: "",
      category: categories[0] || "",
    });
    setFormErrors({});
    setUploadingImage(false);
    setSavingItem(false);
    setDeletingItem(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.price.trim()) {
      errors.price = "Price is required";
    } else if (!/^£?\d+\.?\d*$/.test(formData.price.trim())) {
      errors.price = "Please enter a valid price (e.g., £7.99)";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    if (!formData.image.trim()) {
      errors.image = "Image is required";
    }

    if (!formData.category.trim()) {
      errors.category = "Category is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleImgUpload = async (img) => {
    if (!img) return;

    setUploadingImage(true);
    setFormErrors((prev) => ({ ...prev, image: "" }));

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", img);
      uploadFormData.append("upload_preset", "aryamenu");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dhkfdkkmf/image/upload",
        uploadFormData
      );

      const imageUrl = response.data.secure_url;
      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
      showToast("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      showToast("Failed to upload image. Please try again.", "error");
      setFormErrors((prev) => ({
        ...prev,
        image: "Failed to upload image. Please try again.",
      }));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    // Validate form first
    if (!validateForm()) {
      return;
    }

    setSavingItem(true);

    try {
      if (modalType === "add") {
        // Add new item via API
        const newItem = {
          ...formData,
          price: formData.price.startsWith("£")
            ? formData.price
            : `£${formData.price}`,
        };

        console.log("New item added:", newItem);
        await axios.post("https://arya-server.onrender.com/api/menu", {
          item: newItem,
        });
        setMenuData((prev) => [...prev, newItem]);
        showToast("Menu item added successfully!");
      } else if (modalType === "edit") {
        // Update existing item via API
        const updatedItem = {
          ...formData,
          price: formData.price.startsWith("£")
            ? formData.price
            : `£${formData.price}`,
        };

        console.log("Editing item:", selectedItem);
        await axios.post(
          `https://arya-server.onrender.com/api/menu/${selectedItem._id}`,
          { item: updatedItem }
        );
        setMenuData((prev) =>
          prev.map((item) =>
            item.name === selectedItem.name
              ? { ...updatedItem, _id: item._id }
              : item
          )
        );
        showToast("Menu item updated successfully!");
      }

      closeModal();
    } catch (error) {
      console.error("Error saving menu item:", error);
      showToast("Failed to save menu item. Please try again.", "error");
    } finally {
      setSavingItem(false);
    }
  };

  const handleDelete = async () => {
    setDeletingItem(true);

    try {
      if (selectedItem) {
        // Delete item via API
        await axios.delete(
          `https://arya-server.onrender.com/api/menu/${
            selectedItem._id || selectedItem.name
          }`
        );
        const updatedMenu = menuItems.filter(
          (item) => item.name !== selectedItem.name
        );
        setMenuData(updatedMenu);
      }
      closeModal();
    } catch (error) {
      console.error("Error deleting menu item:", error);
      alert("Failed to delete menu item. Please try again.");
    } finally {
      setDeletingItem(false);
    }
  };

  function editMenuItem(item) {
    openModal("edit", item);
  }

  function addNewItem(categoryName) {
    openModal("add", null, categoryName);
  }
  function addToCart(item) {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.name === item.name
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [
          ...prevItems,
          {
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1,
            description: item.description || "No description available.",
          },
        ];
      }
    });
    setMenuData((prev) => prev);
  }

  function decrementFromCart(item) {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.name === item.name
      );
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        if (updatedItems[existingItemIndex].quantity > 1) {
          updatedItems[existingItemIndex].quantity -= 1;
          return updatedItems;
        } else {
          return updatedItems.filter((cartItem) => cartItem.name !== item.name);
        }
      }
      return prevItems;
    });
  }

  useEffect(() => {
    const menuContent = document.querySelector(".menu-content");
    const menuTabs = document.querySelector(".menu-tabs");
    if (!menuContent || !menuTabs) return;

    const onScroll = () => {
      if (menuContent.scrollTop > 0) {
        menuTabs.classList.add("scrolled");
      } else {
        menuTabs.classList.remove("scrolled");
      }
    };

    menuContent.addEventListener("scroll", onScroll);
    return () => menuContent.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tabs = tabsRef.current;
    if (!tabs) return;

    const onMouseDown = (e) => {
      isDragging.current = true;
      setDragging(true);
      startX.current = e.pageX - tabs.offsetLeft;
      scrollLeft.current = tabs.scrollLeft;
      tabs.classList.add("dragging");
    };
    const onMouseLeave = () => {
      isDragging.current = false;
      setDragging(false);
      tabs.classList.remove("dragging");
    };
    const onMouseUp = () => {
      isDragging.current = false;
      setDragging(false);
      tabs.classList.remove("dragging");
    };
    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - tabs.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      tabs.scrollLeft = scrollLeft.current - walk;
    };

    tabs.addEventListener("mousedown", onMouseDown);
    tabs.addEventListener("mouseleave", onMouseLeave);
    tabs.addEventListener("mouseup", onMouseUp);
    tabs.addEventListener("mousemove", onMouseMove);

    // Touch events
    const onTouchStart = (e) => {
      isDragging.current = true;
      setDragging(true);
      startX.current = e.touches[0].pageX - tabs.offsetLeft;
      scrollLeft.current = tabs.scrollLeft;
      tabs.classList.add("dragging");
    };
    const onTouchEnd = () => {
      isDragging.current = false;
      setDragging(false);
      tabs.classList.remove("dragging");
    };
    const onTouchMove = (e) => {
      if (!isDragging.current) return;
      const x = e.touches[0].pageX - tabs.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      tabs.scrollLeft = scrollLeft.current - walk;
    };

    tabs.addEventListener("touchstart", onTouchStart);
    tabs.addEventListener("touchend", onTouchEnd);
    tabs.addEventListener("touchmove", onTouchMove);

    return () => {
      tabs.removeEventListener("mousedown", onMouseDown);
      tabs.removeEventListener("mouseleave", onMouseLeave);
      tabs.removeEventListener("mouseup", onMouseUp);
      tabs.removeEventListener("mousemove", onMouseMove);
      tabs.removeEventListener("touchstart", onTouchStart);
      tabs.removeEventListener("touchend", onTouchEnd);
      tabs.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  const showSection = (sectionId) => {
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const formatSectionName = (sectionId) => {
    return sectionId
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout pageType="menu">
      <div className="menu-container">
        <div className="menu-image">
          <Navbar variant="overlay" />
          <img src="/media/menu_main.png" alt="Main Dish" />
          <div className="menu-heading-container">
            <h1 className="menu-heading" style={{ fontWeight: "lighter" }}>
              MENU
            </h1>
          </div>
        </div>

        <div className="menu-content">
          {loading ? (
            <div className="loading-container">
              <p>Loading menu...</p>
            </div>
          ) : (
            <>
              <div
                className={`menu-tabs-container${isMobile ? " mobile" : ""}`}
              >
                <div
                  className={`menu-tabs${dragging ? " dragging" : ""}`}
                  ref={tabsRef}
                  id="menu-tabs"
                >
                  {categories.map((sectionId) => (
                    <button
                      key={sectionId}
                      className={`tab-button ${
                        activeSection === sectionId ? "active" : ""
                      }`}
                      onClick={() => showSection(sectionId)}
                    >
                      {formatSectionName(sectionId)}
                    </button>
                  ))}
                </div>
              </div>

              {categories.map((sectionId) => {
                const categoryItems = menuItems.filter(
                  (item) => item.category === sectionId
                );
                return (
                  <div key={sectionId} id={sectionId} className="menu-section">
                    <div className="menu-category-decor">
                      <span className="diamond-line left">
                        <span className="diamond-shape" />
                        <span className="line-shape" />
                      </span>
                      <h2 className="menu-category">
                        {formatSectionName(sectionId)}
                      </h2>
                      <span className="diamond-line right">
                        <span className="line-shape" />
                        <span className="diamond-shape" />
                      </span>
                    </div>
                    {admin && (
                      <div className="add-item-container">
                        <button
                          className="add-new-item-btn"
                          onClick={() => addNewItem(sectionId)}
                        >
                          Add New Item to {formatSectionName(sectionId)}
                        </button>
                      </div>
                    )}
                    {categoryItems.map((item, index) => {
                      const cartItem = cartItems.find(
                        (i) => i.name === item.name
                      );

                      return (
                        <div key={index} className="menu-item">
                          <img
                            src={item.image || "/media/item1.png"}
                            alt={item.name}
                            onError={(e) => {
                              e.target.src = "/media/item1.png";
                            }}
                          />
                          <div className="item-text">
                            <div className="item-header">
                              <span>{item.name}</span>
                              <div className="ckcjc7">
                                <div className="c1az4bwh"></div>
                              </div>
                              <span className="price">{item.price}</span>
                            </div>
                            <p style={{ whiteSpace: "pre-line" }}>
                              {item.description}
                            </p>
                          </div>

                          {/* --- MODIFICATION START --- */}
                          {admin ? (
                            <div className="item-buttons">
                              <button
                                className="edit-item-btn"
                                onClick={() => editMenuItem(item)}
                              >
                                Edit
                              </button>
                            </div>
                          ) : cartItem ? (
                            <div className="cart-controls">
                              <button onClick={() => decrementFromCart(item)}>
                                -
                              </button>
                              <p
                                style={{
                                  color: "rgb(239, 231, 210)",
                                  fontSize: "20px",
                                }}
                              >
                                {cartItem.quantity}
                              </p>
                              <button onClick={() => addToCart(item)}>+</button>
                            </div>
                          ) : (
                            <div className="item-buttons">
                              <button
                                className="add-to-cart-btn"
                                onClick={() => addToCart({ ...item })}
                              >
                                Add To Cart
                              </button>
                            </div>
                          )}
                          {/* --- MODIFICATION END --- */}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Modal Component */}
        {showModal && (
          <div
            className="modal-overlay"
            onClick={() => {
              // Only close if no operations are in progress
              if (!savingItem && !deletingItem && !uploadingImage) {
                closeModal();
              }
            }}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {(savingItem || deletingItem || uploadingImage) && (
                <div className="modal-loading-overlay">
                  <div className="loading-spinner"></div>
                  <span>
                    {uploadingImage && "Uploading image..."}
                    {savingItem && "Saving item..."}
                    {deletingItem && "Deleting item..."}
                  </span>
                </div>
              )}
              <div className="modal-header">
                <h2>
                  {modalType === "add" && "Add New Menu Item"}
                  {modalType === "edit" && "Edit Menu Item"}
                  {modalType === "delete" && "Delete Menu Item"}
                </h2>
                <button
                  className="modal-close"
                  onClick={closeModal}
                  disabled={savingItem || deletingItem || uploadingImage}
                >
                  &times;
                </button>
              </div>

              <div className="modal-body">
                {modalType === "delete" ? (
                  <div className="delete-confirmation">
                    <p>
                      Are you sure you want to delete "{selectedItem?.name}"?
                    </p>
                    <p>This action cannot be undone.</p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSave();
                    }}
                  >
                    <div className="form-group">
                      <label htmlFor="name">Name: *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={formErrors.name ? "error" : ""}
                        placeholder="Enter item name"
                        required
                      />
                      {formErrors.name && (
                        <span className="error-text">{formErrors.name}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="price">Price: *</label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className={formErrors.price ? "error" : ""}
                        placeholder="£7.99"
                        required
                      />
                      {formErrors.price && (
                        <span className="error-text">{formErrors.price}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">Description: *</label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className={formErrors.description ? "error" : ""}
                        placeholder="Enter item description"
                        rows="4"
                        required
                      />
                      {formErrors.description && (
                        <span className="error-text">
                          {formErrors.description}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="image">Upload Image: *</label>
                      <div className="file-upload-container">
                        <input
                          type="file"
                          id="image"
                          name="image"
                          onChange={(e) => {
                            handleImgUpload(e.target.files[0]);
                          }}
                          accept="image/*"
                          className={formErrors.image ? "error" : ""}
                          disabled={uploadingImage}
                        />
                        {uploadingImage && (
                          <div className="upload-status">
                            <div className="loading-spinner"></div>
                            <span>Uploading image, please wait...</span>
                          </div>
                        )}
                        {formData.image && !uploadingImage && (
                          <div className="image-preview">
                            <img src={formData.image} alt="Preview" />
                            <span>✓ Image uploaded successfully</span>
                          </div>
                        )}
                      </div>
                      {formErrors.image && (
                        <span className="error-text">{formErrors.image}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="category">Category: *</label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={formErrors.category ? "error" : ""}
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {formatSectionName(cat)}
                          </option>
                        ))}
                      </select>
                      {formErrors.category && (
                        <span className="error-text">
                          {formErrors.category}
                        </span>
                      )}
                    </div>
                  </form>
                )}
              </div>

              <div className="modal-footer">
                <button
                  className="btn-cancel"
                  onClick={closeModal}
                  disabled={savingItem || deletingItem || uploadingImage}
                >
                  Cancel
                </button>
                {modalType === "delete" ? (
                  <button
                    className="btn-delete"
                    onClick={handleDelete}
                    disabled={deletingItem}
                  >
                    {deletingItem && (
                      <span className="loading-spinner-small"></span>
                    )}
                    {deletingItem ? "Deleting..." : "Delete"}
                  </button>
                ) : modalType === "edit" ? (
                  <>
                    <button
                      className="btn-delete"
                      onClick={handleDelete}
                      disabled={deletingItem || savingItem}
                    >
                      {deletingItem && (
                        <span className="loading-spinner-small"></span>
                      )}
                      {deletingItem ? "Deleting..." : "Delete Item"}
                    </button>
                    <button
                      className="btn-save"
                      onClick={handleSave}
                      disabled={savingItem || uploadingImage}
                    >
                      {savingItem && (
                        <span className="loading-spinner-small"></span>
                      )}
                      {savingItem ? "Saving..." : "Save Changes"}
                    </button>
                  </>
                ) : (
                  <button
                    className="btn-save"
                    onClick={handleSave}
                    disabled={savingItem || uploadingImage}
                  >
                    {savingItem && (
                      <span className="loading-spinner-small"></span>
                    )}
                    {savingItem ? "Adding..." : "Add Item"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
export default Menu;
