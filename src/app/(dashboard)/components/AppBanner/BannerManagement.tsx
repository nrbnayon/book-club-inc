"use client";
import { useState } from "react";
import type {
  GenericDataItem,
  ColumnConfig,
  ActionConfig,
  CardConfig,
  FormField,
} from "@/types/dynamicCardTypes";
import { DynamicCard3D } from "@/components/common/DynamicCard3D";
import { DynamicDataCreateModal } from "@/components/common/DynamicDataCreateModal";
import { Button } from "@/components/ui/button";
import Lordicon from "@/components/lordicon/lordicon-wrapper";

interface BannerDataItem extends GenericDataItem {
  image: string;
}

// Sample banner data
const bannerData: BannerDataItem[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

interface BannerManagementProps {
  itemsPerPage?: number;
  title?: string;
  showAds?: number;
  showBanners?: number;
}

export default function BannerManagement({
  itemsPerPage = 10,
  title = "Banner Management",
  showBanners = 1,
}: BannerManagementProps) {
  const [banners, setBanners] = useState(bannerData);
  const [isLoading] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerDataItem | null>(
    null
  );

  // Check if we should show Add Banner button
  const shouldShowAddButton = banners.length < showBanners;

  // Column Configuration for Banner
  const bannerColumns: ColumnConfig[] = [
    {
      key: "image",
      label: "Banner Image",
      type: "image",
      sortable: false,
    },
  ];

  // Card Configuration
  const cardConfig: CardConfig = {
    imageKey: "image",
  };

  // Actions Configuration
  const bannerActions: ActionConfig[] = [
    {
      key: "edit",
      label: "Edit Banner",
      icon: (
        <Lordicon
          src='https://cdn.lordicon.com/cbtlerlm.json'
          trigger='hover'
          size={16}
          className='mt-1'
          colors={{
            primary: "#9ca3af",
            secondary: "",
          }}
          stroke={4}
        />
      ),
      variant: "ghost",
      onClick: (item) => handleEditBanner(item as BannerDataItem),
    },
    {
      key: "delete",
      label: "Delete Banner",
      icon: (
        <Lordicon
          src='https://cdn.lordicon.com/jmkrnisz.json'
          trigger='hover'
          size={16}
          className='mt-1'
          colors={{
            primary: "#FF0000",
            secondary: "#FFFFFF",
          }}
          stroke={4}
        />
      ),
      variant: "ghost",
      onClick: (item) => handleDeleteBanner(item.id),
    },
  ];

  // Form Fields Configuration - Only image field
  const createFormFields: FormField[] = [
    {
      key: "image",
      label: "Banner Image",
      type: "image",
      required: true,
      section: "content",
      gridCol: "full",
      placeholder: "Upload banner image",
    },
  ];

  // Form Sections
  const createModalSections = [
    {
      key: "content",
      title: "Upload",
      description: "16:9 ratio image for better result",
      icon: "🖼️",
    },
  ];

  // Generate unique ID
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Handle creating new banner
  const handleCreateBanner = (data: Record<string, unknown>) => {
    // Handle image - single image only for banner
    const imageValue =
      Array.isArray(data.image) && data.image.length > 0
        ? data.image[0]
        : typeof data.image === "string"
        ? data.image
        : "";

    const newBannerData: BannerDataItem = {
      id: generateId(),
      image:
        imageValue ||
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedBanners = [newBannerData, ...banners];
    setBanners(updatedBanners);
    setCreateModalOpen(false);
    console.log("New banner created:", newBannerData);
  };

  // Handle editing banner
  const handleEditBanner = (banner: BannerDataItem) => {
    setEditingBanner(banner);
    setEditModalOpen(true);
  };

  // Handle updating banner
  const handleUpdateBanner = (data: Record<string, unknown>) => {
    if (!editingBanner) return;

    // Handle image
    const imageValue =
      Array.isArray(data.image) && data.image.length > 0
        ? data.image[0]
        : typeof data.image === "string"
        ? data.image
        : editingBanner.image;

    const updatedBannerData: BannerDataItem = {
      ...editingBanner,
      image: imageValue,
      updatedAt: new Date().toISOString(),
    };

    const updatedBanners = banners.map((banner) =>
      banner.id === editingBanner.id ? updatedBannerData : banner
    );
    setBanners(updatedBanners);
    setEditingBanner(null);
    setEditModalOpen(false);
    console.log("Banner updated:", updatedBannerData);
  };

  // Handle deleting banner
  const handleDeleteBanner = (bannerId: string) => {
    const updatedBanners = banners.filter((banner) => banner.id !== bannerId);
    setBanners(updatedBanners);
    console.log("Banner deleted:", bannerId);
  };

  // Handle data change from DynamicCard3D
  const handleDataChange = (newData: GenericDataItem[]) => {
    setBanners(newData as BannerDataItem[]);
  };

  // Prepare initial data for edit modal
  const getEditInitialData = () => {
    if (!editingBanner) return {};
    return {
      image: editingBanner.image,
    };
  };

  return (
    <div className='w-full mx-auto'>
      <div className='w-full flex justify-between items-center mb-6'>
        <h2 className='text-foreground text-xl font-semibold'>{title}</h2>
        {shouldShowAddButton && (
          <Button
            className='flex items-center gap-2 bg-primary/80 border-primary/30 rounded-md'
            size='lg'
            onClick={() => setCreateModalOpen(true)}
          >
            <span className='mt-1.5'>
              <Lordicon
                src='https://cdn.lordicon.com/ueoydrft.json'
                trigger='hover'
                size={20}
                colors={{
                  primary: "",
                  secondary: "",
                }}
                stroke={1}
              />
            </span>
            <span>Create Banner</span>
          </Button>
        )}
      </div>

      {/* Dynamic 3D Card Component */}
      <DynamicCard3D
        data={banners}
        columns={bannerColumns}
        cardConfig={cardConfig}
        actions={bannerActions}
        onDataChange={handleDataChange}
        loading={isLoading}
        emptyMessage='No banners found! Create New One '
        itemsPerPage={itemsPerPage}
      />

      {/* Create Banner Modal */}
      <DynamicDataCreateModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSave={handleCreateBanner}
        title='Create Banner'
        fields={createFormFields}
        sections={createModalSections}
        saveButtonText='Create Banner'
        cancelButtonText='Cancel'
        maxImageSizeInMB={5}
        maxImageUpload={1}
        acceptedImageFormats={[
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ]}
      />

      {/* Edit Banner Modal */}
      {editingBanner && (
        <DynamicDataCreateModal
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setEditingBanner(null);
          }}
          onSave={handleUpdateBanner}
          title='Edit Banner'
          description='Update banner image'
          fields={createFormFields}
          sections={createModalSections}
          initialData={getEditInitialData()}
          saveButtonText='Update Banner'
          cancelButtonText='Cancel'
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
