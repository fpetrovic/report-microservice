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
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\Table;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource]
#[Entity]
#[Table(name: 'report_field_option')]
class ReportSelectableFieldOption
{
    use TimestampableProperties;
    use SoftDeletableProperties;
    use IdTrait;
    use Sortable;

    #[Column(type: 'string', length: 255)]
    #[Groups(['reportSelectableField:read', 'reportSelectableField:write', 'baseReport:item:read', 'baseReport:item:write'])]
    private string $name;

    #[ManyToOne(targetEntity: ReportSelectableField::class, inversedBy: 'reportSelectableFieldOptions')]
    #[JoinColumn(name: 'report_selectable_field_id', referencedColumnName: 'id')]
    private ReportSelectableField $reportSelectableField;

    #[Column(type: 'boolean')]
    #[Groups(['reportSelectableField:read', 'reportSelectableField:write', 'report:item:read', 'report:item:write'])]
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

    public function getReportSelectableField(): ReportSelectableField
    {
        return $this->reportSelectableField;
    }

    public function setReportSelectableField(ReportSelectableField $reportSelectableField): void
    {
        $this->reportSelectableField = $reportSelectableField;
    }
}
