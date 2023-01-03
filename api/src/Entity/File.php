<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Trait\IdTrait;
use App\Entity\Trait\SoftDeletableProperties;
use App\Entity\Trait\TimestampableProperties;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource]
#[Entity]
class File
{
    use IdTrait;
    use TimestampableProperties;
    use SoftDeletableProperties;

    #[Column(type: 'string', length: 255)]
    #[Groups(['report:item:read', 'report:item:write'])]
    private string $fileType;

    #[Column(type: 'string', length: 255)]
    #[Groups(['report:item:read', 'report:item:write'])]
    private string $storageKeyOriginal;

    #[Column(type: 'string', length: 255)]
    #[Groups(['report:item:read', 'report:item:write'])]
    private string $storageKey;

    #[Column(type: 'string', length: 255)]
    #[Groups(['report:item:read', 'report:item:write'])]
    private string $storageKeyThumbnail = 'test';

    #[Column(type: 'string', length: 255)]
    #[Groups(['report:item:read', 'report:item:write'])]
    private string $originalFilename = 'test';

    #[Column(type: 'string', length: 255)]
    #[Groups(['report:item:read', 'report:item:write'])]
    private string $uploadDevice = 'test';

    #[Column(type: 'boolean', options:['default'=>false])]
    #[Groups(['report:item:read', 'report:item:write'])]
    private bool $isArchived = false;

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
