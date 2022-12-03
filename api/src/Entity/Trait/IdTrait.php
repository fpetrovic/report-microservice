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
    #[ Id,
        Column(type: "bigint", nullable: false, options: ['unsigned' => false]),
        GeneratedValue(strategy: "IDENTITY")]
    #[Groups(['id'])]
    private string $id;
    public function getId(): ?string
    {
        return $this->id;
    }
}
