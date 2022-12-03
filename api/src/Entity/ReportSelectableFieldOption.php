<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Trait\IdTrait;
use App\Entity\Trait\SoftDeletableProperties;
use App\Entity\Trait\Sortable;
use App\Entity\Trait\TimestampableProperties;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource]
#[Entity]
class ReportSelectableFieldOption
{
    use TimestampableProperties;
    use SoftDeletableProperties;
    use IdTrait;
    use Sortable;

    #[Column(type: 'string', length: 255, nullable: false)]
    #[Groups(['reportField:read', 'reportField:write', 'baseReport:item:read', 'baseReport:item:write'])]
    private string $name;

    #[Column(type: 'boolean', nullable: false)]
    #[Groups(['reportField:read', 'reportField:write', 'report:item:read', 'report:item:write'])]
    private bool $isSelected = false;

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getIsSelected(): bool
    {
        return $this->isSelected;
    }

    public function setIsSelected(bool $isSelected): void
    {
        $this->isSelected = $isSelected;
    }
}
