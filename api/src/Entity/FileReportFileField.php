<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Interface\EntityFileOwnerInterface;
use App\Entity\Trait\IdTrait;
use App\Entity\Trait\SoftDeletableProperties;
use App\Entity\Trait\TimestampableProperties;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;

#[ApiResource()]
#[Entity]
class FileReportFileField implements EntityFileOwnerInterface
{
    use IdTrait;
    use TimestampableProperties;
    use SoftDeletableProperties;

    #[ManyToOne(targetEntity: ReportFileField::class, inversedBy: 'files')]
    #[JoinColumn(name: 'report_file_field_id', referencedColumnName: 'id')]
    private ReportFileField $entityFileOwner;
}
