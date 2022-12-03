<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Trait\IdTrait;
use App\Entity\Trait\SoftDeletableProperties;
use App\Entity\Trait\TimestampableProperties;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\DiscriminatorColumn;
use Doctrine\ORM\Mapping\DiscriminatorMap;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\InheritanceType;
use Doctrine\ORM\Mapping\Table;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['record:read']],
    denormalizationContext: ['groups' => ['record:write']],
)]
#[Table('rcd_record')]
#[InheritanceType('JOINED')]
#[DiscriminatorColumn(name: 'entity_type', type: 'string')]
#[DiscriminatorMap(['issue' => Issue::class, 'checklist' => Checklist::class, 'note' => Note::class])]
#[Entity]
class Record
{
    use IdTrait;
    use TimestampableProperties;
    use SoftDeletableProperties;

    #[Column(type: 'string', length: 255, nullable: false)]
    #[Groups(['record:read', 'record:write'])]
    private string $name;
}
