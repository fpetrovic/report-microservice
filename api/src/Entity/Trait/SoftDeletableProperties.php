<?php

declare(strict_types=1);

namespace App\Entity\Trait;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping\Column;
use Gedmo\Mapping\Annotation\SoftDeleteable;

#[SoftDeleteable(fieldName: 'deletedAt', timeAware: false, hardDelete: true)]
trait SoftDeletableProperties
{
    #[Column(type: Types::DATETIME_IMMUTABLE, nullable: true)]
    public ?\DatetimeInterface $deletedAt;

    public function getDeletedAt(): ?\DatetimeInterface
    {
        return $this->deletedAt;
    }

    public function isDeleted(): bool
    {
        return null !== $this->deletedAt;
    }
}
