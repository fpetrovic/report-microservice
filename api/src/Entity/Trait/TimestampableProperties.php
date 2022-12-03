<?php

declare(strict_types=1);

namespace App\Entity\Trait;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping\Column;
use Gedmo\Mapping\Annotation\Timestampable;
use Symfony\Component\Serializer\Annotation\Groups;

trait TimestampableProperties
{
    #[Timestampable(on: 'create')]
    #[Column(type: Types::DATETIME_IMMUTABLE, nullable: false)]
    #[Groups(['timestampable'])]
    public \DatetimeInterface $createdAt;

    #[Timestampable(on: 'update')]
    #[Column(type: Types::DATETIME_IMMUTABLE, nullable: false)]
    #[Groups(['timestampable'])]
    public \DatetimeInterface $updatedAt;

    public function getCreatedAt(): \DatetimeInterface
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): \DatetimeInterface
    {
        return $this->updatedAt;
    }
}
