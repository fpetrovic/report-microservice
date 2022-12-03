<?php

declare(strict_types=1);

namespace App\Entity\Trait;

use ApiPlatform\Metadata\ApiProperty;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;

trait IdTrait
{
    #[Id, Column, GeneratedValue]
//    #[ApiProperty(identifier: false)]
    #[Groups(['id'])]
    private ?string $id = null;

//    #[Column(type: 'uuid', unique:true)]
//    #[ApiProperty(identifier: true)]
//    #[Groups(['id'])]
//    public ?string $uuid = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(?string $id = null): void
    {
        $this->id = $id; // ?? Uuid::v4()->__toString()
    }
}
