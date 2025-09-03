"use client";
import { BookDataItem, booksData } from "@/data/booksData";
import { useState } from "react";
import type {
  GenericDataItem,
  ColumnConfig,
  ActionConfig,
  CardConfig,
  FormField,
  SearchFilterConfig,
} from "@/types/dynamicCardTypes";
import { DynamicCard3D } from "@/components/common/DynamicCard3D";
import { DynamicDataCreateModal } from "@/components/common/DynamicDataCreateModal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Lordicon from "@/components/lordicon/lordicon-wrapper";

interface BookManagementProps {
  itemsPerPage?: number;
  title?: string;
}

export default function BookManagement({
  itemsPerPage = 12,
  title = "Book Management",
}: BookManagementProps) {
  const [books, setBooks] = useState(booksData);
  const [isLoading] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BookDataItem | null>(null);

  // Column Configuration for Books
  const bookColumns: ColumnConfig[] = [
    {
      key: "book_name",
      label: "Book Name",
      sortable: true,
      searchable: true,
      align: "left",
      render: (value, item) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={
                typeof item.image === "string" && item.image
                  ? item.image
                  : "/placeholder.svg?height=48&width=48"
              }
              alt={String(value)}
              className="w-full h-full object-cover"
              width={48}
              height={48}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-sm truncate">{String(value)}</p>
            {typeof item.book_price === "string" && item.book_price && (
              <p className="text-xs text-green-600 font-semibold">
                {item.book_price}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "description",
      label: "Description",
      type: "textarea",
      sortable: false,
      searchable: true,
    },
    {
      key: "image",
      label: "Cover Image",
      type: "image",
      sortable: false,
      render: (value) => {
        const imageUrl = typeof value === "string" ? value : "/placeholder.svg";
        return (
          <div className="w-16 h-20 rounded overflow-hidden">
            <Image
              src={imageUrl}
              alt="Book cover"
              className="w-full h-full object-cover"
              width={64}
              height={80}
            />
          </div>
        );
      },
    },
    {
      key: "book_price",
      label: "Price",
      sortable: true,
      render: (value) => (
        <span className="text-green-600 font-semibold">
          {typeof value === "string" ? value : "N/A"}
        </span>
      ),
    },
    {
      key: "book_pdf",
      label: "PDF Available",
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            typeof value === "string" && value
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {typeof value === "string" && value ? "Available" : "Not Available"}
        </span>
      ),
    },
  ];

  // Card Configuration
  const cardConfig: CardConfig = {
    titleKey: "book_name",
    imageKey: "image",
    descriptionKey: "description",
    badgeKeys: ["book_price"],
    showDetailsButton: true,
  };

  // Search Filter Configuration
  const searchFilterConfig: SearchFilterConfig = {
    searchPlaceholder: "Search books by name, description...",
    searchKeys: ["book_name", "description"],
    enableSort: true,
    sortOptions: [
      { key: "book_name", label: "Book Name" },
      { key: "book_price", label: "Price" },
    ],
    filters: [
      {
        key: "has_pdf",
        label: "PDF Available",
        type: "select",
        options: [
          { value: "true", label: "Available" },
          { value: "false", label: "Not Available" },
        ],
      },
    ],
  };

  // Actions Configuration
  const bookActions: ActionConfig[] = [
    {
      key: "edit",
      label: "Edit Book",
      icon: (
        <Lordicon
          src="https://cdn.lordicon.com/cbtlerlm.json"
          trigger="hover"
          size={16}
          className="mt-1"
          colors={{
            primary: "#9ca3af",
            secondary: "",
          }}
          stroke={4}
        />
      ),
      variant: "ghost",
      onClick: (item) => handleEditBook(item as BookDataItem),
    },
    {
      key: "delete",
      label: "Delete Book",
      icon: (
        <Lordicon
          src="https://cdn.lordicon.com/jmkrnisz.json"
          trigger="hover"
          size={16}
          className="mt-1"
          colors={{
            primary: "#FF0000",
            secondary: "#FFFFFF",
          }}
          stroke={4}
        />
      ),
      variant: "ghost",
      onClick: (item) => handleDeleteBook(item.id),
    },
  ];

  // Form Fields Configuration
  const createFormFields: FormField[] = [
    {
      key: "book_name",
      label: "Book Name",
      type: "text",
      required: true,
      placeholder: "Enter book name",
      validation: {
        minLength: 2,
        maxLength: 200,
      },
      section: "basic",
      gridCol: "full",
    },
    {
      key: "description",
      label: "Description",
      type: "textarea",
      required: true,
      placeholder: "Enter book description...",
      section: "basic",
      gridCol: "full",
    },
    {
      key: "image",
      label: "Book Cover Image",
      type: "image",
      required: true,
      section: "basic",
      gridCol: "full",
    },
    {
      key: "book_price",
      label: "Book Price",
      type: "text",
      required: false,
      placeholder: "$9.99",
      section: "details",
      gridCol: "half",
    },
    {
      key: "book_pdf",
      label: "Book PDF",
      type: "pdf",
      required: false,
      placeholder: "Upload PDF file or enter URL",
      section: "details",
      gridCol: "full",
    },
  ];

  // Form Sections
  const createModalSections = [
    {
      key: "basic",
      title: "Basic Information",
      description: "Enter the basic details for the book",
      icon: "📚",
    },
    {
      key: "details",
      title: "Book Details",
      description: "Add pricing and PDF information",
      icon: "💰",
    },
  ];

  // Generate unique ID
  const generateId = () => {
    return (
      "book" + Date.now().toString() + Math.random().toString(36).substr(2, 9)
    );
  };

  // Handle creating new book
  const handleCreateBook = (data: Record<string, unknown>) => {
    // Handle image - single image only for book cover
    const imageValue =
      Array.isArray(data.image) && data.image.length > 0
        ? data.image[0]
        : typeof data.image === "string"
        ? data.image
        : "";

    const newBookData: BookDataItem = {
      id: generateId(),
      book_name: String(data.book_name || ""),
      description: String(data.description || ""),
      image:
        imageValue ||
        "https://images.unsplash.com/photo-1544716278-ca5e3f4ebf0c?w=400&h=300&fit=crop",
      book_price: data.book_price ? String(data.book_price) : undefined,
      book_pdf: data.book_pdf ? String(data.book_pdf) : undefined,
    };

    const updatedBooks = [newBookData, ...books];
    setBooks(updatedBooks);
    setCreateModalOpen(false);
    console.log("New book created:", newBookData);
  };

  // Handle editing book
  const handleEditBook = (book: BookDataItem) => {
    setEditingBook(book);
    setEditModalOpen(true);
  };

  // Handle updating book
  const handleUpdateBook = (data: Record<string, unknown>) => {
    if (!editingBook) return;

    // Handle image
    const imageValue =
      Array.isArray(data.image) && data.image.length > 0
        ? data.image[0]
        : typeof data.image === "string"
        ? data.image
        : editingBook.image;

    const updatedBookData: BookDataItem = {
      ...editingBook,
      book_name: String(data.book_name || ""),
      description: String(data.description || ""),
      image: imageValue,
      book_price: data.book_price ? String(data.book_price) : undefined,
      book_pdf: data.book_pdf ? String(data.book_pdf) : undefined,
    };

    const updatedBooks = books.map((book) =>
      book.id === editingBook.id ? updatedBookData : book
    );
    setBooks(updatedBooks);
    setEditingBook(null);
    setEditModalOpen(false);
    console.log("Book updated:", updatedBookData);
  };

  // Handle deleting book
  const handleDeleteBook = (bookId: string) => {
    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
    console.log("Book deleted:", bookId);
  };

  // Handle data change from DynamicCard3D
  const handleDataChange = (newData: GenericDataItem[]) => {
    setBooks(newData as BookDataItem[]);
  };

  // Prepare initial data for edit modal
  const getEditInitialData = () => {
    if (!editingBook) return {};
    return {
      book_name: editingBook.book_name || "",
      description: editingBook.description || "",
      image: editingBook.image || "",
      book_price: editingBook.book_price || "",
      book_pdf: editingBook.book_pdf || "",
    };
  };

  return (
    <div className="w-full mx-auto">
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-foreground text-xl font-semibold">{title}</h2>
        <Button
          className="flex items-center gap-2 border-primary/30 rounded-md"
          size="lg"
          onClick={() => setCreateModalOpen(true)}
        >
          <span className="mt-1.5">
            <Lordicon
              src="https://cdn.lordicon.com/ueoydrft.json"
              trigger="hover"
              size={20}
              colors={{
                primary: "",
                secondary: "",
              }}
              stroke={1}
            />
          </span>
          <span>Add Book</span>
        </Button>
      </div>

      {/* Dynamic 3D Card Component */}
      <DynamicCard3D
        data={books}
        columns={bookColumns}
        cardConfig={cardConfig}
        actions={bookActions}
        searchFilterConfig={searchFilterConfig}
        onDataChange={handleDataChange}
        loading={isLoading}
        emptyMessage="No books found! Add new ones"
        itemsPerPage={itemsPerPage}
      />

      {/* Create Book Modal */}
      <DynamicDataCreateModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSave={handleCreateBook}
        title="Add New Book"
        description="Add a new book to your collection"
        fields={createFormFields}
        sections={createModalSections}
        saveButtonText="Add Book"
        cancelButtonText="Cancel"
        maxImageSizeInMB={5}
        maxImageUpload={1}
        acceptedImageFormats={[
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ]}
      />

      {/* Edit Book Modal */}
      {editingBook && (
        <DynamicDataCreateModal
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setEditingBook(null);
          }}
          onSave={handleUpdateBook}
          title="Edit Book"
          description="Update book information"
          fields={createFormFields}
          sections={createModalSections}
          initialData={getEditInitialData()}
          saveButtonText="Update Book"
          cancelButtonText="Cancel"
          maxImageUpload={1}
          maxImageSizeInMB={5}
          acceptedImageFormats={[
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
          ]}
        />
      )}
    </div>
  );
}
