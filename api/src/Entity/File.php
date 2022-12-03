<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Trait\IdTrait;
use App\Entity\Trait\SoftDeletableProperties;
use App\Entity\Trait\TimestampableProperties;
use Doctrine\ORM\Mapping\Entity;

#[ApiResource]
#[Entity]
class File
{
    use IdTrait;
    use TimestampableProperties;
    use SoftDeletableProperties;

    private string $type;

    private string $storageKeyOriginal;

    private string $storageKey;

    private string $storageKeyThumbnail;

    private string $originalFilename;

    private string $uploadDevice;

    private bool $isArchived;

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): void
    {
        $this->type = $type;
    }

    public function getStorageKeyOriginal(): string
    {
        return $this->storageKeyOriginal;
    }

    public function setStorageKeyOriginal(string $storageKeyOriginal): void
    {
        $this->storageKeyOriginal = $storageKeyOriginal;
    }

    public function getStorageKey(): string
    {
        return $this->storageKey;
    }

    public function setStorageKey(string $storageKey): void
    {
        $this->storageKey = $storageKey;
    }

    public function getStorageKeyThumbnail(): string
    {
        return $this->storageKeyThumbnail;
    }

    public function setStorageKeyThumbnail(string $storageKeyThumbnail): void
    {
        $this->storageKeyThumbnail = $storageKeyThumbnail;
    }

    public function getOriginalFilename(): string
    {
        return $this->originalFilename;
    }

    public function setOriginalFilename(string $originalFilename): void
    {
        $this->originalFilename = $originalFilename;
    }

    public function getUploadDevice(): string
    {
        return $this->uploadDevice;
    }

    public function setUploadDevice(string $uploadDevice): void
    {
        $this->uploadDevice = $uploadDevice;
    }

    public function isArchived(): bool
    {
        return $this->isArchived;
    }

    public function setIsArchived(bool $isArchived): void
    {
        $this->isArchived = $isArchived;
    }
}
